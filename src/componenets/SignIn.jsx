import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignIn = ({ setAuthenticated, setAuthenticatedUserId }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setErrorMessage("Please enter your username and password.");
      return;
      
    }

    try {
      const response = await axios.get(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user?username=${formData.username}&password=${formData.password}`
      );
      if (response.data.length > 0) {
        setAuthenticated(true);
        setAuthenticatedUserId(response.data[0].id);
        localStorage.setItem("loginUser", JSON.stringify(response.data));
        toast.success("Login Successful!"); 
        navigate("/");
        
      } else {
        setErrorMessage("Incorrect username or password");
        toast.error("Incorrect username or password"); 
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Please try correct username and password.");
      toast.error(" Please try correct username and password."); 
    }
  };

  return (
    <Grid
  container
  spacing={2}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: "100vh" }}
>
  <Grid item>
    <Typography variant="h5">Login</Typography>
  </Grid>
  
  <Grid item>
    <form onSubmit={handleSubmit}>
      <Grid item>
        <TextField
          type="text"
          name="username"
          label="Username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
      </Grid>
      <Grid item style={{ marginTop: 20 }}>
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item style={{ marginTop: 20 }}>
        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="outlined"
          color="primary"
          style={{ marginLeft: 10 }}
        >
          SignUp
        </Button>
      </Grid>
    </form>
  </Grid>
</Grid>
  );
};

export default SignIn;