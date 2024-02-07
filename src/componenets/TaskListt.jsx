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
} from "@mui/material";

const TaskListt = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    name: "",
    title: "",
    discription: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

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

  const handleDelete = async (userId, taskId) => {
    try {
      await axios.delete(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userId}/task/${taskId}`
      );
      // Remove the task from the state
      setTasks(tasks.filter((task) => task.id !== taskId));
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
      console.log("Task updated successfully:", response.data);
      // Update the task in the state
      const updatedTasks = tasks.map((task) =>
        task.id === id ? response.data : task
      );
      setTasks(updatedTasks);
      // Reset the form
      setUpdatedTask({
        name: "",
        title: "",
        discription: "",
      });
      setTaskToUpdate(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = (task) => {
    setTaskToUpdate(task.id);
    setUpdatedTask(task);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Discription</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.discription}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(task.userId, task.id)}>
                  Delete
                </Button>
                <Button onClick={() => handleEdit(task)}>Edit</Button>
              </TableCell>
              {taskToUpdate === task.id && (
                <TableCell colSpan={4}>
                  <TextField
                    type="text"
                    name="name"
                    value={updatedTask.name}
                    onChange={handleChange}
                  />
                  <TextField
                    type="text"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleChange}
                  />
                  <TextField
                    type="text"
                    name="discription"
                    value={updatedTask.discription}
                    onChange={handleChange}
                  />
                  <Button onClick={() => handleUpdate(task.id)}>Update</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskListt;
