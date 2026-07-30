import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const ProtectedRoute = ({ children }) => {

  const user = getCurrentUser();


  if (!user) {

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


  return children;

};

export default ProtectedRoute;