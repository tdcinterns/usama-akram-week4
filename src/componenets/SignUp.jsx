import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userID: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const generateRandomUserID = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      setErrorMessage("Please enter your username and password.");
      return;
  
    }
    const userID = generateRandomUserID();
    try {
      await axios.post(
        "https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user",
        { ...formData, userID: userID } 
      );
      
      navigate("/");
      toast.success("Sign Up Successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up. Please try again.");
    }
  };

  return (
    <Grid
    container
    spacing={2}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >
    <Grid item>
      <Typography variant="h5">Sign Up</Typography>
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
        </Grid>
        <Grid item>
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="primary"
          style={{ marginLeft: 10 }}
        >
          Login
        </Button>
        </Grid>
      </form>
    </Grid>
  </Grid>    
    
  );
};

export default SignUp;
