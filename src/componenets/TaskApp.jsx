/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import TaskListt from "./TaskListt";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";
const TaskApp = ({ authenticated, authenticatedUserId }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (authenticated) {
      getTasks();
    }
  }, [authenticated]);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        "https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/task"
      );
      setTasks(
        response.data.filter((task) => task.userId === authenticatedUserId)
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <>
      {authenticated ? (
        <>
          <TaskForm
            authenticatedUserId={authenticatedUserId}
            getTasks={getTasks}
          />
          <TaskListt tasks={tasks} getTasks={getTasks} />
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default TaskApp;
