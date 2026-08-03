import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  HandHelping,
  HeartHandshake,
  IndianRupee,
  MapPin,
  Plus,
} from "lucide-react";

import { getEmergencyRequests } from "../utils/emergencyStorage";

const urgencyStyles = {
  Low: "bg-sky-100 text-sky-800",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });


export default function EmergencyRequests() {


  const [requests, setRequests] = useState([]);



  useEffect(() => {
    const loadRequests = () => setRequests(
      getEmergencyRequests().filter((request) => request.status === "verified")
    );
    loadRequests();
    window.addEventListener("emergencyRequestsUpdated", loadRequests);
    window.addEventListener("storage", loadRequests);
    return () => {
      window.removeEventListener("emergencyRequestsUpdated", loadRequests);
      window.removeEventListener("storage", loadRequests);
    };
  }, []);



  return (

    <main className="min-h-screen bg-[#FDF6ED]">


      <section className="bg-[#2E332B] px-6 py-16 text-white">

        <div className="mx-auto max-w-6xl text-center">


          <HeartHandshake className="mx-auto h-10 w-10 text-[#DCCFC0]" />


          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#DCCFC0]">
            Community emergency support
          </p>


          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Emergency Requests
          </h1>


          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            See where urgent help is needed and stand with communities in crisis.
          </p>


          <Link
            to="/create-emergency-request"
            className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#DCCFC0]
            px-6
            py-3
            font-semibold
            text-[#2E332B]
            transition
            hover:bg-white
            "
          >

            <Plus className="h-5 w-5" />

            Create Emergency Request

          </Link>


        </div>

      </section>



      <section className="mx-auto max-w-6xl px-6 py-12">


        {requests.length === 0 ? (


          <div className="rounded-3xl border border-dashed border-[#DCCFC0] bg-white p-12 text-center">


            <HandHelping className="mx-auto h-12 w-12 text-[#66785F]" />


            <h2 className="mt-4 text-2xl font-bold text-[#2E332B]">

              No verified emergency requests

            </h2>


            <p className="mt-2 text-gray-600">

              Be the first person to raise awareness about an urgent need.

            </p>



            <Link

              to="/create-emergency-request"

              className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#66785F]
              px-6
              py-3
              text-white
              font-semibold
              hover:bg-[#2E332B]
              "

            >

              <Plus className="h-5 w-5" />

              Create Request

            </Link>


          </div>



        ) : (



          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


            {requests.map((request,index)=>(


              <motion.article

                key={request.id}

                initial={{
                  opacity:0,
                  y:16
                }}

                animate={{
                  opacity:1,
                  y:0
                }}

                transition={{
                  duration:0.25,
                  delay:index*0.04
                }}

                className="
                flex
                flex-col
                rounded-3xl
                border
                border-[#DCCFC0]
                bg-white
                p-6
                shadow-sm
                "

              >



                <div className="flex items-start justify-between gap-3">


                  <div className="flex items-center gap-2 text-sm font-semibold text-[#66785F]">

                    <HeartHandshake className="h-5 w-5"/>

                    {request.category}

                  </div>



                  <span
                    className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-bold
                    ${urgencyStyles[request.urgency] || "bg-gray-100 text-gray-700"}
                    `}
                  >

                    <AlertTriangle className="mr-1 inline h-3.5 w-3.5"/>

                    {request.urgency}

                  </span>


                </div>




                <h2 className="mt-5 text-xl font-bold text-[#2E332B]">

                  {request.title}

                </h2>




                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">

                  {request.description}

                </p>




                <div className="mt-5 space-y-3 border-y border-[#F0E7DB] py-5 text-sm text-gray-700">


                  <p className="flex items-center gap-2">

                    <MapPin className="h-4 w-4 text-[#66785F]"/>

                    {request.location}

                  </p>



                  <p className="flex items-center gap-2">

                    <HandHelping className="h-4 w-4 text-[#66785F]"/>

                    {request.helpType}

                  </p>



                  <p className="flex items-center gap-2">

                    <IndianRupee className="h-4 w-4 text-[#66785F]"/>

                    {Number(request.amountRequired || 0)
                    .toLocaleString("en-IN")} required

                  </p>



                  <p>

                    <span className="font-semibold text-[#2E332B]">
                      Items:
                    </span>

                    {" "}

                    {request.requiredItems || "Not specified"}

                  </p>


                </div>




                <div className="mt-5 text-sm text-gray-600">


                  <p>

                    Created by

                    {" "}

                    <span className="font-medium text-[#2E332B]">

                      {request.creatorName}

                    </span>


                  </p>


                  <p className="mt-1">

                    {formatDate(request.createdAt)}

                  </p>


                </div>




                <Link

                  to={`/emergency-request/${request.id}`}

                  className="
                  mt-6
                  rounded-full
                  bg-[#66785F]
                  px-5
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#2E332B]
                  "

                >

                  View Details

                </Link>



              </motion.article>


            ))}


          </div>


        )}


      </section>


    </main>

  );

}
