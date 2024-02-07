/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";

const Logg = ({ setAuthenticated, setAuthenticatedUserId }) => {
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
    try {
      const response = await axios.get(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user?username=${formData.username}&password=${formData.password}`
      );
      if (response.data.length > 0) {
        setAuthenticated(true);
        setAuthenticatedUserId(response.data[0].id);
        navigate("/taskapp");
      } else {
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again.");
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
          <TextField
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
          />
        </form>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
        </form>
      </Grid>
      <Grid item>
        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Logg;
