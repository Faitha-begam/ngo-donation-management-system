import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const AdminRoute = ({ children }) => {

  const user = getCurrentUser();


  if(!user){

    return (

      <Navigate
        to="/login"
        replace
        state={{
          message:
          "Please login to access this page."
        }}
      />

    );

  }



  if(user.role !== "admin"){

    return (

      <Navigate
        to="/profile"
        replace
        state={{
          message:
          "You don't have admin access."
        }}
      />

    );

  }



  return children;

};


export default AdminRoute;