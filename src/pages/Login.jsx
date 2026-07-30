import { useLocation } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";


const Login = () => {

  const location = useLocation();


  const message = location.state?.message;



  return (

    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue managing your donations, volunteer activities and campaigns."
    >

      {
        message && (

          <div
            className="
            mb-5
            rounded-xl
            bg-yellow-100
            text-yellow-700
            px-4
            py-3
            "
          >

            {message}

          </div>

        )
      }


      <LoginForm />


    </AuthLayout>

  );

};


export default Login;