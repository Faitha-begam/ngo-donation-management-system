import { useState } from "react";

import {
  getUsers,
  getTotalDonations,
  updateCurrentUser,
  adminUpdateUser
} from "../utils/auth";


import AdminStats from "../components/admin/AdminStats";
import DonorTable from "../components/admin/DonorTable";
import VolunteerTable from "../components/admin/VolunteerTable";



const Admin = () => {


  const [users,setUsers] =
  useState(getUsers());



  const refreshUsers=()=>{

    setUsers(
      getUsers()
    );

  };




  const totalDonations =
  getTotalDonations();




  const volunteers =
  users.filter(
    user =>
    user.volunteerApplication
  );




  return (

    <div
    className="
    min-h-screen
    bg-[#F5F1E8]
    px-6
    py-10
    "
    >



      <div
      className="
      max-w-7xl
      mx-auto
      "
      >



        <div
        className="
        mb-10
        "
        >

          <h1
          className="
          text-4xl
          font-bold
          text-[#2E332B]
          "
          >
            Admin Dashboard
          </h1>


          <p
          className="
          text-gray-600
          mt-2
          "
          >
            Manage donors, donations and volunteer applications.
          </p>


        </div>
                <AdminStats

          users={users}

          donations={totalDonations}

          volunteers={volunteers.length}

          pending={

            volunteers.filter(
              user =>
              user.volunteerStatus==="Pending"
            ).length

          }

        />





        {/* DONOR MANAGEMENT */}


        <div
        className="
        mt-12
        bg-white
        rounded-3xl
        shadow-lg
        p-6
        md:p-8
        "
        >


          <div
          className="
          mb-6
          "
          >

            <h2
            className="
            text-2xl
            font-bold
            text-[#2E332B]
            "
            >

              Donor Management

            </h2>


            <p
            className="
            text-gray-500
            mt-1
            "
            >

              View registered donors and their donation activity.

            </p>


          </div>





          <DonorTable

            users={users}

          />


        </div>






        {/* VOLUNTEER MANAGEMENT */}


        <div
        className="
        mt-12
        bg-white
        rounded-3xl
        shadow-lg
        p-6
        md:p-8
        "
        >


          <div
          className="
          mb-6
          "
          >

            <h2
            className="
            text-2xl
            font-bold
            text-[#2E332B]
            "
            >

              Volunteer Applications

            </h2>


            <p
            className="
            text-gray-500
            mt-1
            "
            >

              Review and manage volunteer requests.

            </p>


          </div>





          <VolunteerTable

            users={users}

            refreshUsers={refreshUsers}

          />


        </div>



      </div>


    </div>

  );


};


export default Admin;