import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";

const Sign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userID: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRandomUserID = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = generateRandomUserID();
    try {
      await axios.post(
        "https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user",
        { ...formData, userID: userID } // Include userID in the form data
      );
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
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
        <Typography variant="h5">Sign Up</Typography>
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
        <form onSubmit={handleSubmit}>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="primary"
            style={{ marginLeft: 10 }}
          >
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Sign;
