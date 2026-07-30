import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../../utils/auth";

const LoginForm = () => {

  const navigate = useNavigate();


  const [formData,setFormData] = useState({

    email:"",
    password:""

  });


  const [showPassword,setShowPassword] = useState(false);


  const [error,setError] = useState("");

  const [success,setSuccess] = useState("");





  const handleChange = (e)=>{


    setError("");

    setSuccess("");



    setFormData(previous=>({

      ...previous,

      [e.target.name]:
      e.target.value

    }));


  };







  const handleSubmit = (e)=>{


    e.preventDefault();



    if(!formData.email || !formData.password){


      setError(
        "Please fill in all fields."
      );


      return;

    }







    const result =
    loginUser(
      formData.email,
      formData.password
    );





    if(!result.success){


      setError(
        result.message
      );


      return;


    }






    setSuccess(
      "Login successful!"
    );







    setTimeout(()=>{



      if(result.user.role === "admin"){


        navigate("/admin");


      }

      else{


        navigate("/profile");


      }



    },1000);



  };







  return (

    <>


      {
        error &&

        <div
          className="
          mb-5
          bg-red-100
          text-red-600
          px-4
          py-3
          rounded-xl
          "
        >

          {error}

        </div>

      }






      {
        success &&

        <div
          className="
          mb-5
          bg-green-100
          text-green-700
          px-4
          py-3
          rounded-xl
          "
        >

          {success}

        </div>

      }









      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >





        <div>


          <label
            className="
            block
            mb-2
            font-medium
            "
          >

            Email

          </label>



          <input

            type="email"

            name="email"

            placeholder="john@gmail.com"

            value={formData.email}

            onChange={handleChange}


            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-[#7A866E]
            "

          />


        </div>









        <div>


          <label
            className="
            block
            mb-2
            font-medium
            "
          >

            Password

          </label>





          <div
            className="
            relative
            "
          >



            <input


              type={
                showPassword
                ?
                "text"
                :
                "password"
              }


              name="password"


              placeholder="********"


              value={formData.password}


              onChange={handleChange}



              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              pr-12
              outline-none
              focus:ring-2
              focus:ring-[#7A866E]
              "


            />





            <button


              type="button"


              onClick={()=>


                setShowPassword(
                  !showPassword
                )


              }



              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              "


            >


              {
                showPassword

                ?

                <EyeOff size={20}/>

                :

                <Eye size={20}/>

              }



            </button>



          </div>



        </div>








        <button


          type="submit"


          className="
          w-full
          bg-[#7A866E]
          hover:bg-[#67725C]
          transition
          text-white
          font-semibold
          py-3
          rounded-xl
          "


        >

          Login

        </button>





      </form>








      <p
        className="
        text-center
        mt-6
        text-gray-600
        "
      >

        Don't have an account?{" "}


        <Link

          to="/register"

          className="
          text-[#7A866E]
          font-semibold
          hover:underline
          "

        >

          Register

        </Link>


      </p>




    </>

  );

};


export default LoginForm;