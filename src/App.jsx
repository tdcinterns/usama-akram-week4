import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./componenets/Sign";
import Login from "./componenets/Logg";
import TaskApp from "./componenets/TaskApp";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route
            path="/login"
            element={
              <Login
                setAuthenticated={setAuthenticated}
                setAuthenticatedUserId={setAuthenticatedUserId}
              />
            }
          />
          <Route
            path="/taskapp"
            element={
              <TaskApp
                authenticated={authenticated}
                authenticatedUserId={authenticatedUserId}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
