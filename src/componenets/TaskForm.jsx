import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";


const TaskForm = ({ authenticatedUserId, getTasks }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    discription: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${formData.userId}/task`,
        {
          ...formData,
          userId: authenticatedUserId,
        }
      );
  
      const newTask = response.data;
  
      getTasks((prevTasks) => [...prevTasks, newTask]);
      setFormData({ ...formData, name: "", title: "", discription: "" });
      setOpen(false); 
      toast.success("Task Added Successfully!"); 
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Task
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="userId"
                  label="User Id"
                  variant="outlined"
                  value={formData.userId}
                  onChange={handleChange}
                  fullWidth
                />
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
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskForm;