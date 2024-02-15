import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";

//authenticatedUserId ,

const TaskListt = ({  getTasks }) => {
  
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    name: "",
    title: "",
    discription: "",
  });
  const [open, setOpen] = useState(false); 

  
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/task"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [getTasks]);

  const handleDelete = async (userId, taskId) => {
    try {
      await axios.delete(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userId}/task/${taskId}`
      );
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId || task.userId !== userId));
      toast.success("Task is Deleted ")
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/task/${id}`,
        updatedTask
      );
      const updatedTasks = tasks.map((task) =>
        task.id === id ? response.data : task
      );
      setTasks(updatedTasks);
      setUpdatedTask({
        name: "",
        title: "",
        discription: "",
      });
      setTaskToUpdate(null);
      setOpen(false);
      toast.success("Task is updated")
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = (task) => {
    setTaskToUpdate(task.id);
    setUpdatedTask(task);
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.discription}</TableCell>
                <TableCell>
                  <Button
                   onClick={() => handleDelete(task?.userId, task?.id)}
                  >
                    Delete
                  </Button>
                  <Button onClick={() => handleEdit(task)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              value={updatedTask.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="text"
              name="title"
              label="Title"
              variant="outlined"
              value={updatedTask.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="text"
              name="discription"
              label="Discription"
              variant="outlined"
              value={updatedTask.discription}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleUpdate(taskToUpdate)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskListt;
