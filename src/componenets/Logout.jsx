import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    toast.success("Logout Successful!");
    window.location.href = '/';
  };

  return (
    
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
    
  );
};

export default Logout;
