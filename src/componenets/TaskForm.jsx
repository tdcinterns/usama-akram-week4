/* eslint-disable react/prop-types */

import { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid } from "@mui/material";

const TaskForm = ({ authenticatedUserId, getTasks }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    discription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/task",
        {
          ...formData,
          userId: authenticatedUserId,
        }
      );

      const newTask = response.data;
      getTasks((prevTasks) => [...prevTasks, newTask]);
      setFormData({ name: "", title: "", discription: "" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit} spacing={2}>
      <Grid item xs={12}>
        <TextField
          type="text"
          name="name"
          label="Name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          type="text"
          name="title"
          label="Title"
          variant="outlined"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          name="discription"
          label="Discription"
          variant="outlined"
          value={formData.discription}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
