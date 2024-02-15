import { useEffect, useState } from "react";
import axios from "axios";
import TaskListt from "./TaskListt";
import TaskForm from "./TaskForm";
import Logout from "./Logout";


const TaskApp = () => {
  
  const [tasks, setTasks] = useState([]);


  const getTasks = async () => {
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
    getTasks();
  }, [getTasks]);

  return (
    <>
      <TaskForm tasks={tasks} setTasks={setTasks} getTasks={getTasks} />
      <Logout />      
      <TaskListt tasks={tasks} setTasks={setTasks} getTasks={getTasks} />
    </>
  );
};

export default TaskApp;
