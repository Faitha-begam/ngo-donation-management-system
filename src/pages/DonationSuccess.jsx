import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import CertificatePreview from "../components/CertificatePreview";

import {
  Check,
  Quote,
  BookOpen,
  Utensils,
  HeartHandshake,
  Award,
  FileText,
  ArrowRight,
} from "lucide-react";


const quotes = [
  "Every contribution creates an opportunity for someone to build a better future.",
  "Your generosity inspires hope where it is needed most.",
  "Small acts of kindness can create lifelong change.",
  "Thank you for believing that every person deserves a brighter tomorrow.",
  "Your support helps turn compassion into meaningful action.",
];



const DonationSuccess = () => {


  const location = useLocation();



  const donation = location.state || {

    name:"Anonymous Donor",

    amount:500,

    campaign:"Provide Education for Underprivileged Children",

    id:"NGO20260728001",

  };




  const [showCertificate,setShowCertificate] =
    useState(false);





  const randomQuote =
    quotes[
      Math.floor(
        Math.random()*quotes.length
      )
    ];





  const handleDownloadCertificate = async()=>{


    try{


      const certificate =
        document.getElementById(
          "certificate"
        );



      if(!certificate){

        throw new Error(
          "Certificate element not found"
        );

      }





      const canvas =
        await html2canvas(
          certificate,
          {

            scale:2,

            useCORS:true,

            backgroundColor:"#ffffff",

          }

        );





      const image =
        canvas.toDataURL(
          "image/png"
        );





      const pdf =
        new jsPDF({

          orientation:"landscape",

          unit:"px",

          format:[
            1000,
            707
          ],

        });





      pdf.addImage(

        image,

        "PNG",

        0,

        0,

        1000,

        707

      );





      pdf.save(

        `HOPE-NGO-Certificate-${donation.name}.pdf`

      );



    }

    catch(error){


      console.error(
        "Certificate Error:",
        error
      );


      alert(
        "Certificate download failed. Please try again."
      );


    }


  };






  const impact = {


    books:
      Math.max(
        1,
        Math.floor(
          donation.amount/300
        )
      ),



    meals:
      Math.max(
        1,
        Math.floor(
          donation.amount/100
        )
      ),



    families:
      Math.max(
        1,
        Math.floor(
          donation.amount/1500
        )
      ),


  };





  return (


<div className="min-h-screen bg-[#F8F7F2] relative overflow-hidden">



<div className="
absolute
-top-44
-left-44
w-96
h-96
rounded-full
bg-[#DCE6D4]
blur-3xl
opacity-40
"/>



<div className="
absolute
top-1/3
-right-44
w-[420px]
h-[420px]
rounded-full
bg-[#EEF3E8]
blur-3xl
opacity-70
"/>





<div className="relative z-10 max-w-7xl mx-auto px-6 py-16">





<motion.section

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.7
}}

className="text-center"

>


<motion.div

initial={{
scale:0
}}

animate={{
scale:1
}}

transition={{
duration:.7,
delay:.2,
type:"spring",
stiffness:180
}}

className="flex justify-center"

>


<div className="relative">


<motion.div

animate={{
scale:[1,1.12,1],
opacity:[.25,.08,.25]
}}

transition={{
duration:3,
repeat:Infinity
}}

className="absolute inset-0 rounded-full bg-[#7A866E]"

/>



<div className="
relative
w-32
h-32
rounded-full
bg-[#7A866E]
shadow-2xl
flex
items-center
justify-center
">

<Check
size={58}
strokeWidth={3}
className="text-white"
/>


</div>


</div>


</motion.div>





<motion.h1

className="
mt-10
text-5xl
md:text-6xl
font-bold
text-[#364030]
"

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
delay:.45
}}

>

Thank You,

<br/>

{donation.name}

</motion.h1>





<motion.p

className="
mt-6
max-w-3xl
mx-auto
text-lg
leading-8
text-gray-600
"

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
delay:.6
}}

>

Your generosity is helping create opportunities,
strengthen communities, and improve lives.
Every contribution, regardless of its size,
moves our mission one step forward.

</motion.p>





</motion.section>
        {/* Appreciation Quote */}


        <motion.section

          initial={{
            opacity:0,
            y:25
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          className="mt-20"

        >


          <div className="
          max-w-4xl
          mx-auto
          bg-white
          rounded-[32px]
          shadow-lg
          p-10
          ">


            <div className="
            flex
            justify-center
            mb-5
            ">


              <div className="
              w-16
              h-16
              rounded-full
              bg-[#F4F7F0]
              flex
              items-center
              justify-center
              ">


                <Quote

                  size={30}

                  className="text-[#7A866E]"

                />


              </div>


            </div>





            <h2 className="
            text-2xl
            font-semibold
            text-center
            text-[#364030]
            ">

              A Message of Appreciation

            </h2>





            <p className="
            mt-6
            text-center
            text-gray-600
            text-lg
            leading-8
            italic
            ">


              "{randomQuote}"


            </p>



          </div>



        </motion.section>









        {/* Impact Section */}



        <motion.section

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          viewport={{
            once:true
          }}

          className="mt-24"

        >



          <div className="
          text-center
          mb-12
          ">


            <h2 className="
            text-4xl
            font-bold
            text-[#364030]
            ">

              Your Contribution Can Help

            </h2>



            <p className="
            mt-4
            text-gray-600
            max-w-2xl
            mx-auto
            ">


              Every donation creates meaningful impact.
              Here is an estimate of what your generosity
              can help provide.


            </p>


          </div>







          <div className="
          grid
          md:grid-cols-3
          gap-8
          ">





            {/* BOOKS */}


            <motion.div

              whileHover={{
                y:-8
              }}

              className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
              text-center
              "

            >


              <div className="
              mx-auto
              w-16
              h-16
              rounded-2xl
              bg-[#F3F6EF]
              flex
              items-center
              justify-center
              ">


                <BookOpen

                  className="text-[#7A866E]"

                />


              </div>




              <h3 className="
              mt-6
              text-4xl
              font-bold
              text-[#364030]
              ">

                {impact.books}

              </h3>



              <p className="
              mt-2
              text-lg
              font-medium
              ">

                Education Kits

              </p>




              <p className="
              mt-3
              text-gray-500
              ">

                Helping children continue learning.

              </p>



            </motion.div>








            {/* MEALS */}



            <motion.div

              whileHover={{
                y:-8
              }}

              className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
              text-center
              "

            >


              <div className="
              mx-auto
              w-16
              h-16
              rounded-2xl
              bg-[#F3F6EF]
              flex
              items-center
              justify-center
              ">


                <Utensils

                  className="text-[#7A866E]"

                />


              </div>





              <h3 className="
              mt-6
              text-4xl
              font-bold
              text-[#364030]
              ">

                {impact.meals}

              </h3>





              <p className="
              mt-2
              text-lg
              font-medium
              ">

                Nutritious Meals

              </p>





              <p className="
              mt-3
              text-gray-500
              ">

                Supporting families with daily nutrition.

              </p>



            </motion.div>









            {/* FAMILIES */}



            <motion.div

              whileHover={{
                y:-8
              }}

              className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
              text-center
              "

            >


              <div className="
              mx-auto
              w-16
              h-16
              rounded-2xl
              bg-[#F3F6EF]
              flex
              items-center
              justify-center
              ">


                <HeartHandshake

                  className="text-[#7A866E]"

                />


              </div>






              <h3 className="
              mt-6
              text-4xl
              font-bold
              text-[#364030]
              ">

                {impact.families}

              </h3>






              <p className="
              mt-2
              text-lg
              font-medium
              ">

                Families Supported

              </p>






              <p className="
              mt-3
              text-gray-500
              ">

                Bringing hope to communities in need.

              </p>




            </motion.div>





          </div>



        </motion.section>









        {/* Donation Summary */}



        <motion.section

          initial={{
            opacity:0,
            y:30
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:.5
          }}

          className="mt-24"

        >



          <div className="
          bg-white
          rounded-[32px]
          shadow-lg
          p-10
          ">




            <div className="
            flex
            items-center
            gap-3
            mb-8
            ">



              <div className="
              w-14
              h-14
              rounded-2xl
              bg-[#F3F6EF]
              flex
              items-center
              justify-center
              ">


                <FileText

                  size={28}

                  className="text-[#7A866E]"

                />


              </div>





              <div>


                <h2 className="
                text-3xl
                font-bold
                text-[#364030]
                ">

                  Donation Summary

                </h2>



                <p className="
                text-gray-500
                mt-1
                ">

                  Your contribution has been recorded successfully.

                </p>



              </div>



            </div>






            <div className="
            grid
            md:grid-cols-2
            gap-8
            ">



              <div className="space-y-6">


                <SummaryItem
                  label="Donor Name"
                  value={donation.name}
                />


                <SummaryItem
                  label="Campaign"
                  value={donation.campaign}
                />


                <SummaryItem
                  label="Donation ID"
                  value={donation.id}
                />



              </div>







              <div className="space-y-6">



                <SummaryItem

                  label="Amount"

                  value={`₹${donation.amount}`}

                  large

                />



                <SummaryItem

                  label="Date"

                  value={new Date().toLocaleDateString()}

                />




                <div>

                  <p className="
                  text-sm
                  text-gray-500
                  mb-1
                  ">

                    Status

                  </p>



                  <span className="
                  inline-flex
                  px-4
                  py-2
                  rounded-full
                  bg-green-100
                  text-green-700
                  font-semibold
                  ">

                    Successful

                  </span>



                </div>




              </div>



            </div>





          </div>



        </motion.section>
                {/* Badge Section */}


        <motion.section

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          viewport={{
            once:true
          }}

          className="mt-24"

        >


          <div className="
          bg-white
          rounded-[32px]
          shadow-lg
          p-10
          ">



            <div className="
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-10
            ">




              <div>



                <div className="
                w-20
                h-20
                rounded-full
                bg-[#F3F6EF]
                flex
                items-center
                justify-center
                mb-6
                ">


                  <Award

                    size={40}

                    className="text-[#7A866E]"

                  />


                </div>





                <h2 className="
                text-3xl
                font-bold
                text-[#364030]
                ">

                  Hope Starter

                </h2>





                <p className="
                mt-4
                text-gray-600
                leading-7
                max-w-lg
                ">

                  Thank you for making your first contribution.
                  Every meaningful journey begins with a single
                  act of kindness.

                </p>




              </div>







              <div className="
              w-full
              max-w-md
              ">



                <div className="
                flex
                justify-between
                mb-3
                ">


                  <span className="
                  font-medium
                  text-[#364030]
                  ">

                    Progress

                  </span>



                  <span className="
                  text-gray-500
                  ">

                    1 / 5 Donations

                  </span>


                </div>






                <div className="
                h-4
                rounded-full
                bg-gray-200
                overflow-hidden
                ">



                  <motion.div

                    initial={{
                      width:0
                    }}

                    whileInView={{
                      width:"20%"
                    }}

                    viewport={{
                      once:true
                    }}

                    transition={{
                      duration:1
                    }}

                    className="
                    h-full
                    bg-[#7A866E]
                    "

                  />


                </div>





                <p className="
                mt-4
                text-gray-500
                ">

                  Four more donations to unlock

                  <span className="
                  font-semibold
                  text-[#364030]
                  ">

                    {" "}Kindness Supporter

                  </span>


                </p>




              </div>



            </div>



          </div>



        </motion.section>









        {/* Certificate Section */}



        <motion.section

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          viewport={{
            once:true
          }}

          className="mt-24"

        >



          <div className="
          bg-white
          rounded-[32px]
          shadow-lg
          p-10
          ">




            <div className="
            grid
            lg:grid-cols-2
            gap-10
            items-center
            ">



              <div>



                <h2 className="
                text-3xl
                font-bold
                text-[#364030]
                ">

                  Certificate of Appreciation

                </h2>




                <p className="
                mt-5
                text-gray-600
                leading-8
                ">

                  Your contribution deserves recognition.
                  View your personalized certificate acknowledging
                  your generous support towards our mission.

                </p>





                <button

                  onClick={() =>
                    setShowCertificate(true)
                  }

                  className="
                  mt-8
                  bg-[#7A866E]
                  hover:bg-[#68745E]
                  text-white
                  px-7
                  py-4
                  rounded-full
                  font-semibold
                  transition
                  "

                >

                  View Certificate

                </button>



              </div>








              <div className="
              border-[10px]
              border-[#F4F6F1]
              rounded-3xl
              p-10
              ">




                <h3 className="
                text-2xl
                font-bold
                text-center
                text-[#364030]
                ">

                  Certificate

                </h3>




                <div className="
                w-20
                h-[2px]
                bg-[#7A866E]
                mx-auto
                my-6
                " />





                <p className="
                text-center
                text-gray-500
                ">

                  Presented To

                </p>




                <h4 className="
                text-3xl
                font-bold
                text-center
                mt-3
                text-[#364030]
                ">

                  {donation.name}

                </h4>





                <p className="
                mt-8
                text-center
                text-gray-600
                leading-8
                ">


                  In appreciation of your generous contribution
                  towards creating positive change in the lives
                  of those who need it most.


                </p>




              </div>



            </div>



          </div>



        </motion.section>









        {/* Navigation Buttons */}



        <motion.section

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          viewport={{
            once:true
          }}

          className="
          mt-24
          mb-10
          "

        >




          <div className="
          flex
          flex-wrap
          justify-center
          gap-5
          ">




            <Link

              to="/dashboard"

              className="
              bg-[#7A866E]
              hover:bg-[#68745E]
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
              transition
              flex
              items-center
              gap-2
              "

            >

              Dashboard

              <ArrowRight size={18}/>

            </Link>






            <Link

              to="/campaigns"

              className="
              border-2
              border-[#7A866E]
              text-[#7A866E]
              hover:bg-[#7A866E]
              hover:text-white
              px-8
              py-4
              rounded-full
              font-semibold
              transition
              "

            >

              Donate Again

            </Link>







            <Link

              to="/"

              className="
              border-2
              border-[#364030]
              text-[#364030]
              hover:bg-[#364030]
              hover:text-white
              px-8
              py-4
              rounded-full
              font-semibold
              transition
              "

            >

              Back Home

            </Link>




          </div>




        </motion.section>





      </div>







      {/* CERTIFICATE MODAL */}



      <CertificatePreview

        open={showCertificate}

        onClose={() =>
          setShowCertificate(false)
        }

        donation={donation}

        onDownload={
          handleDownloadCertificate
        }

      />




    </div>

  );

};







const SummaryItem = ({
  label,
  value,
  large
}) => (

<div>

<p className="
text-sm
text-gray-500
mb-1
">

{label}

</p>



<p
className={`
font-semibold
text-[#364030]
${large 
? "text-3xl text-[#7A866E]" 
: "text-xl"}
`}
>

{value}

</p>


</div>

);




export default DonationSuccess;