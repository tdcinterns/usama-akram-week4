import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Signup from "./componenets/SignUp";
import Login from "./componenets/SignIn";
import TaskApp from "./componenets/TaskApp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated")
  );

  const [authenticatedUserId, setAuthenticatedUserId] = useState(
    localStorage.getItem("authenticatedUserId")
  );
  const authenticateduser = localStorage.getItem("loginUser");



  return (
    <div >

      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          {!authenticateduser ? (
            <>
              <Route
                path="/"
                element={
                  <Login
                    setAuthenticated={setAuthenticated}
                    setAuthenticatedUserId={setAuthenticatedUserId}
                  />
                }
              />
              <Route path="*" element={<Login />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<TaskApp />}
              />
            </>
          )
          }
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
