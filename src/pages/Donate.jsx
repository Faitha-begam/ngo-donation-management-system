// pages/Donate.jsx

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import campaigns from "../data/campaigns";

import {
  getCurrentUser,
  updateCurrentUser
} from "../utils/auth";



const QUICK_AMOUNTS = [
  500,
  1000,
  2500,
  5000
];



const FREQUENCIES = [
  {
    value:"one-time",
    label:"One-Time"
  },

  {
    value:"monthly",
    label:"Monthly"
  }
];





const PAYMENT_METHODS = [

  {
    id:"card",

    label:"Credit / Debit Card",

    icon:(

      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >

        <rect
          x="2"
          y="5"
          width="20"
          height="14"
          rx="2.5"
        />

        <path d="M2 10h20"/>

      </svg>

    )

  },




  {
    id:"upi",

    label:"UPI",

    icon:(

      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >

        <path d="M4 4l16 8-16 8V4z"/>

      </svg>

    )

  },





  {
    id:"netbanking",

    label:"Net Banking",

    icon:(

      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >

        <path d="M3 10l9-6 9 6"/>

        <path d="M5 10v9h14v-9"/>

        <path d="M10 19v-6h4v6"/>

      </svg>

    )

  }

];






const IMPACT_STATS = [

  {
    value:"25,000+",
    label:"Lives Impacted"
  },

  {
    value:"₹50L+",
    label:"Raised"
  },


  {
    value:"120+",
    label:"Volunteers"
  },


  {
    value:"45",
    label:"Communities Served"
  }

];






function isValidEmail(value){

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

}








export default function Donate(){



  const navigate = useNavigate();


  const amountInputRef = useRef(null);



  const currentUser =
    getCurrentUser();





  const [formData,setFormData] = useState({


    fullName:
    currentUser?.name || "",


    email:
    currentUser?.email || "",


    phone:
    currentUser?.phone || "",



    campaign:"",


    amount:"",


    frequency:"one-time",


    paymentMethod:"",


    message:"",


    consent:false


  });







  const [selectedQuickAmount,setSelectedQuickAmount]
  = useState(null);





  const [errors,setErrors]
  = useState({});










  function updateField(field,value){


    setFormData(previous=>({


      ...previous,


      [field]:value


    }));




    if(errors[field]){


      setErrors(previous=>({


        ...previous,


        [field]:""


      }));


    }


  }









  function handleQuickAmount(amount){


    setSelectedQuickAmount(amount);



    updateField(
      "amount",
      String(amount)
    );


  }









  function handleCustomAmount(){


    setSelectedQuickAmount(
      "custom"
    );



    updateField(
      "amount",
      ""
    );



    requestAnimationFrame(()=>{


      amountInputRef.current?.focus();


    });


  }









  function validate(){


    const newErrors={};




    if(!formData.fullName.trim()){


      newErrors.fullName =
      "Full name is required";


    }




    if(!formData.email.trim()){


      newErrors.email =
      "Email address is required";


    }

    else if(
      !isValidEmail(formData.email)
    ){


      newErrors.email =
      "Enter a valid email address";


    }





    if(!formData.campaign){


      newErrors.campaign =
      "Please select a campaign";


    }






    if(
      !formData.amount ||
      Number(formData.amount)<=0
    ){


      newErrors.amount =
      "Enter a valid donation amount";


    }







    if(!formData.paymentMethod){


      newErrors.paymentMethod =
      "Select a payment method";


    }







    if(!formData.consent){


      newErrors.consent =
      "Please accept donation terms";


    }






    setErrors(newErrors);



    return Object.keys(newErrors).length===0;


  }










  function handleSubmit(event){


    event.preventDefault();




    if(!validate()){


      return;


    }






    const user = getCurrentUser();

const donationDetails = {

  id:
  "NGO" + Date.now(),

  donorId:
  user?.id || null,

  name:
  formData.fullName,

  email:
  formData.email,

  phone:
  formData.phone,

  amount:
  Number(formData.amount),

  campaign:
  formData.campaign,

  frequency:
  formData.frequency,

  paymentMethod:
  formData.paymentMethod,

  message:
  formData.message,

  status:
  "Completed",

  createdAt:
  new Date().toISOString()

};

console.log("NEW DONATION OBJECT", donationDetails);
    // Save all donations for admin


    const allDonations =
    JSON.parse(
      localStorage.getItem("donations")
    )
    ||
    [];




    allDonations.push(
      donationDetails
    );




    localStorage.setItem(
      "donations",
      JSON.stringify(allDonations)
    );









    // Save donation inside user profile

// Save donation inside user profile + activity


// Save donation inside user profile + update users database

if(user){


  const updatedUser = {


    ...user,


    donations:[


      ...(user.donations || []),


      donationDetails


    ],



    activities:[


      {

        id:
        Date.now(),


        title:
        "Donation Completed",


        description:
        `Donated ₹${donationDetails.amount.toLocaleString()} to ${donationDetails.campaign}`,


        date:
        new Date().toISOString()


      },


      ...(user.activities || [])


    ]


  };





  // update current logged in user

  updateCurrentUser(
    updatedUser
  );





  // update users array for admin dashboard

  const users =
  JSON.parse(
    localStorage.getItem("users")
  ) || [];





  const updatedUsers =
  users.map(existingUser=>{


    if(existingUser.id === user.id){

      return updatedUser;

    }


    return existingUser;


  });





  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );


}

    navigate(

      "/donation-success",

      {

        state:donationDetails

      }

    );


  }
    return (

    <div className="bg-[#FDF6ED] min-h-screen">



      {/* HERO SECTION */}

      <section
        className="
        relative
        h-[420px]
        md:h-[480px]
        flex
        items-center
        justify-center
        overflow-hidden
        "
      >


        <img

          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80"

          alt="Donation community"

          className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          "

        />



        <div
          className="
          absolute
          inset-0
          bg-[#2E332B]/60
          "
        />




        <div
          className="
          relative
          z-10
          max-w-3xl
          px-6
          text-center
          "
        >



          <span
            className="
            inline-block
            bg-white/10
            border
            border-white/30
            text-white
            text-xs
            uppercase
            tracking-wider
            px-5
            py-2
            rounded-full
            "
          >

            Every Rupee Tracked, Every Life Counted

          </span>





          <h1
            className="
            mt-6
            text-4xl
            md:text-5xl
            font-bold
            text-white
            "
          >

            Your Kindness Creates Lasting Change

          </h1>





          <p
            className="
            mt-5
            text-white/80
            text-lg
            "
          >

            Choose a cause, choose an amount,
            and help us create meaningful impact.

          </p>



        </div>



      </section>









      {/* DONATION FORM */}


      <section

        className="
        max-w-3xl
        mx-auto
        px-6
        mt-16
        "

      >



        <form

          onSubmit={handleSubmit}

          noValidate

          className="
          bg-white
          rounded-[28px]
          shadow-2xl
          border
          border-[#DCCFC0]
          p-6
          md:p-10
          "

        >








          {/* PERSONAL INFORMATION */}


          <div>


            <h2
              className="
              text-xl
              font-semibold
              text-[#2E332B]
              "
            >

              Personal Information

            </h2>




            <p
              className="
              text-sm
              text-gray-500
              mt-1
              mb-6
              "
            >

              We'll use these details to generate your donation receipt.

            </p>








            <div
              className="
              grid
              md:grid-cols-2
              gap-5
              "
            >








              {/* NAME */}


              <div>


                <label
                  className="
                  block
                  text-sm
                  font-medium
                  mb-2
                  "
                >

                  Full Name *

                </label>




                <input


                  type="text"


                  value={formData.fullName}



                  onChange={(e)=>

                    updateField(
                      "fullName",
                      e.target.value
                    )

                  }



                  placeholder="Aditi Sharma"



                  className={`

                  w-full

                  bg-[#FDF6ED]

                  border

                  rounded-2xl

                  px-4

                  py-3

                  outline-none

                  text-sm


                  ${
                    errors.fullName

                    ?

                    "border-red-400"

                    :

                    "border-[#DCCFC0]"
                  }

                  `}


                />





                {
                  errors.fullName &&


                  <p
                    className="
                    text-red-500
                    text-xs
                    mt-1
                    "
                  >

                    {errors.fullName}

                  </p>

                }


              </div>












              {/* EMAIL */}



              <div>


                <label
                  className="
                  block
                  text-sm
                  font-medium
                  mb-2
                  "
                >

                  Email Address *

                </label>





                <input


                  type="email"


                  value={formData.email}




                  onChange={(e)=>

                    updateField(
                      "email",
                      e.target.value
                    )

                  }




                  placeholder="you@example.com"




                  className={`

                  w-full

                  bg-[#FDF6ED]

                  border

                  rounded-2xl

                  px-4

                  py-3

                  outline-none

                  text-sm



                  ${
                    errors.email

                    ?

                    "border-red-400"

                    :

                    "border-[#DCCFC0]"
                  }


                  `}



                />







                {
                  errors.email &&


                  <p
                    className="
                    text-red-500
                    text-xs
                    mt-1
                    "
                  >

                    {errors.email}

                  </p>


                }



              </div>













              {/* PHONE */}



              <div
                className="
                md:col-span-2
                "
              >



                <label
                  className="
                  block
                  text-sm
                  font-medium
                  mb-2
                  "
                >

                  Phone Number

                  <span
                    className="
                    text-gray-400
                    ml-1
                    font-normal
                    "
                  >

                    (optional)

                  </span>


                </label>






                <input


                  type="tel"



                  value={formData.phone}




                  onChange={(e)=>

                    updateField(
                      "phone",
                      e.target.value
                    )

                  }




                  placeholder="+91 98765 43210"





                  className="
                  w-full
                  bg-[#FDF6ED]
                  border
                  border-[#DCCFC0]
                  rounded-2xl
                  px-4
                  py-3
                  text-sm
                  outline-none
                  "


                />



              </div>





            </div>



          </div>












          {/* DONATION DETAILS */}



          <div

            className="
            mt-10
            pt-8
            border-t
            border-[#DCCFC0]
            "

          >



            <h2

              className="
              text-xl
              font-semibold
              text-[#2E332B]
              "

            >

              Donation Details

            </h2>






            <p

              className="
              text-sm
              text-gray-500
              mt-1
              mb-6
              "

            >

              Select the campaign you want to support.

            </p>









            {/* CAMPAIGN SELECT */}



            <label

              className="
              block
              text-sm
              font-medium
              mb-2
              "

            >

              Select Campaign *

            </label>






            <select



              value={formData.campaign}



              onChange={(e)=>

                updateField(
                  "campaign",
                  e.target.value
                )

              }




              className={`

              w-full

              bg-[#FDF6ED]

              border

              rounded-2xl

              px-4

              py-3

              text-sm



              ${
                errors.campaign

                ?

                "border-red-400"

                :

                "border-[#DCCFC0]"
              }



              `}



            >



              <option value="">

                Choose a cause

              </option>







              {
                campaigns.map((campaign)=>(


                  <option

                    key={campaign.id}

                    value={campaign.title}

                  >

                    {campaign.title}

                  </option>


                ))
              }



            </select>






            {
              errors.campaign &&


              <p

                className="
                text-red-500
                text-xs
                mt-1
                "

              >

                {errors.campaign}

              </p>


            }









            {/* AMOUNT */}



            <div className="mt-6">



              <label

                className="
                block
                text-sm
                font-medium
                mb-3
                "

              >

                Donation Amount (₹) *

              </label>





              <div

                className="
                flex
                flex-wrap
                gap-3
                "

              >



                {
                  QUICK_AMOUNTS.map((amount)=>(


                    <button


                      key={amount}


                      type="button"



                      onClick={()=>


                        handleQuickAmount(amount)


                      }



                      className={`

                      px-5

                      py-2.5

                      rounded-full

                      text-sm

                      font-semibold

                      border

                      transition



                      ${
                        selectedQuickAmount===amount


                        ?


                        "bg-[#66785F] text-white border-[#66785F]"



                        :


                        "bg-[#FDF6ED] border-[#DCCFC0]"

                      }


                      `}


                    >


                      ₹{amount.toLocaleString()}



                    </button>



                  ))
                }








                <button


                  type="button"



                  onClick={handleCustomAmount}



                  className={`


                  px-5

                  py-2.5

                  rounded-full

                  text-sm

                  font-semibold

                  border




                  ${
                    selectedQuickAmount==="custom"


                    ?


                    "bg-[#66785F] text-white"



                    :


                    "bg-[#FDF6ED] border-[#DCCFC0]"

                  }



                  `}


                >

                  Custom

                </button>



              </div>
                            <input

                ref={amountInputRef}

                type="number"

                min="1"

                value={formData.amount}



                onChange={(e)=>

                  updateField(
                    "amount",
                    e.target.value
                  )

                }



                placeholder="Enter amount"



                className={`

                mt-4

                w-full

                bg-[#FDF6ED]

                border

                rounded-2xl

                px-4

                py-3



                ${
                  errors.amount

                  ?

                  "border-red-400"

                  :

                  "border-[#DCCFC0]"

                }


                `}

              />






              {
                errors.amount &&


                <p

                  className="
                  text-red-500
                  text-xs
                  mt-1
                  "

                >

                  {errors.amount}

                </p>


              }



            </div>



          </div>









          {/* FREQUENCY */}



          <div

            className="
            mt-10
            pt-8
            border-t
            border-[#DCCFC0]
            "

          >



            <h2

              className="
              text-lg
              font-semibold
              text-[#2E332B]
              mb-4
              "

            >

              Donation Frequency

            </h2>






            <div

              className="
              grid
              grid-cols-2
              gap-4
              "

            >



              {
                FREQUENCIES.map((frequency)=>(



                  <label


                    key={frequency.value}



                    className={`


                    cursor-pointer

                    text-center

                    rounded-2xl

                    border

                    py-3

                    text-sm

                    font-semibold

                    transition




                    ${
                      formData.frequency === frequency.value


                      ?


                      "bg-[#66785F] text-white border-[#66785F]"



                      :


                      "bg-[#FDF6ED] border-[#DCCFC0]"

                    }



                    `}



                  >



                    <input


                      type="radio"


                      name="frequency"



                      value={frequency.value}



                      checked={
                        formData.frequency === frequency.value
                      }




                      onChange={(e)=>

                        updateField(
                          "frequency",
                          e.target.value
                        )

                      }




                      className="hidden"


                    />



                    {frequency.label}



                  </label>


                ))

              }



            </div>



          </div>














          {/* PAYMENT METHOD */}



          <div


            className="
            mt-10
            pt-8
            border-t
            border-[#DCCFC0]
            "


          >



            <h2

              className="
              text-lg
              font-semibold
              text-[#2E332B]
              mb-4
              "

            >

              Payment Method *

            </h2>







            <div

              className="
              grid
              sm:grid-cols-3
              gap-4
              "

            >




              {
                PAYMENT_METHODS.map((method)=>(



                  <button


                    type="button"



                    key={method.id}




                    onClick={()=>


                      updateField(
                        "paymentMethod",
                        method.id
                      )


                    }





                    className={`



                    flex

                    flex-col

                    items-center

                    gap-3

                    py-6

                    rounded-2xl

                    border

                    transition





                    ${
                      formData.paymentMethod === method.id


                      ?


                      "bg-[#66785F]/10 border-[#66785F] text-[#66785F]"



                      :


                      "bg-[#FDF6ED] border-[#DCCFC0]"


                    }



                    `}


                  >



                    {method.icon}





                    <span

                      className="
                      text-sm
                      font-medium
                      "

                    >

                      {method.label}

                    </span>



                  </button>


                ))

              }



            </div>







            {
              errors.paymentMethod &&



              <p

                className="
                text-red-500
                text-xs
                mt-2
                "

              >

                {errors.paymentMethod}

              </p>


            }




          </div>













          {/* MESSAGE */}




          <div


            className="
            mt-10
            pt-8
            border-t
            border-[#DCCFC0]
            "


          >



            <label

              className="
              block
              text-sm
              font-medium
              mb-2
              "

            >

              Optional Message

            </label>






            <textarea


              rows="4"



              value={formData.message}




              onChange={(e)=>

                updateField(
                  "message",
                  e.target.value
                )


              }





              placeholder="Leave a message of encouragement"




              className="
              w-full
              bg-[#FDF6ED]
              border
              border-[#DCCFC0]
              rounded-2xl
              px-4
              py-3
              resize-none
              outline-none
              "



            />



          </div>














          {/* CONSENT */}





          <div className="mt-8">



            <label


              className="
              flex
              items-start
              gap-3
              cursor-pointer
              "


            >



              <input



                type="checkbox"




                checked={formData.consent}




                onChange={(e)=>

                  updateField(
                    "consent",
                    e.target.checked
                  )

                }





                className="
                mt-1
                accent-[#66785F]
                "



              />






              <span

                className="
                text-sm
                text-gray-600
                "

              >

                I agree that my donation will be used
                for NGO initiatives.

              </span>




            </label>







            {
              errors.consent &&



              <p

                className="
                text-red-500
                text-xs
                mt-2
                "

              >

                {errors.consent}

              </p>


            }



          </div>













          {/* SUBMIT BUTTON */}




          <button


            type="submit"




            className="
            mt-10
            w-full
            bg-[#66785F]
            text-white
            py-4
            rounded-full
            font-semibold
            shadow-lg
            hover:bg-[#2E332B]
            transition
            "



          >

            Donate Securely



          </button>





        </form>




      </section>















      {/* IMPACT SECTION */}



      <section


        className="
        bg-[#66785F]
        py-20
        mt-20
        "


      >



        <div


          className="
          max-w-6xl
          mx-auto
          px-6
          "


        >




          <h2


            className="
            text-center
            text-white
            text-3xl
            font-bold
            mb-12
            "


          >

            The Impact You Make Possible

          </h2>







          <div


            className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
            "


          >




            {
              IMPACT_STATS.map((stat)=>(



                <div


                  key={stat.label}



                  className="
                  bg-white/10
                  border
                  border-white/20
                  rounded-3xl
                  text-center
                  py-8
                  "


                >



                  <p


                    className="
                    text-3xl
                    font-bold
                    text-white
                    "


                  >

                    {stat.value}

                  </p>





                  <p


                    className="
                    text-white/80
                    mt-2
                    text-sm
                    "


                  >

                    {stat.label}

                  </p>




                </div>



              ))

            }



          </div>




        </div>



      </section>





    </div>


  );


}