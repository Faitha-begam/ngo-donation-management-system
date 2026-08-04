import { useState, useEffect } from "react";

import { getUsers } from "../../utils/auth";

import DonorTable from "../../components/admin/DonorTable";
import UserDetailsModal from "../../components/admin/UserDetailsModal";
import EmergencyManagement from "./EmergencyManagement";
import RewardManagement from "./RewardManagement";

import toast from "react-hot-toast";



const StatCard = ({
  title,
  value,
  icon
}) => {

  return (

    <div
      className="
      flex min-h-40 flex-col justify-between
      rounded-3xl border border-[#E9E0D5]
      bg-white shadow-sm
      p-6 sm:p-7
      transition duration-200 hover:-translate-y-1 hover:shadow-lg
      "
    >

      <div
        className="
        flex
        justify-between
        items-center
        "
      >

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          {title}
        </p>


        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E7DB] text-xl">
          {icon}
        </span>

      </div>


      <h2
        className="
        text-3xl sm:text-4xl
        font-bold
        text-[#7A866E]
        mt-5
        "
      >

        {value}

      </h2>


    </div>

  );

};







const AdminDashboard = () => {


  const [users,setUsers] = useState([]);

  const [selectedUser,setSelectedUser] = useState(null);

  const [search,setSearch] = useState("");

  const [filter,setFilter] = useState("all");







  useEffect(()=>{

    loadUsers();

  },[]);








  const loadUsers = () => {

    const storedUsers = getUsers();

    setUsers(storedUsers);

  };






  // ADDED: remove admin from donor calculations
  const donors = users.filter(
    user => user.role !== "admin"
  );







  const totalUsers =
  donors.length;








  const totalDonations =
  donors.reduce(

    (total,user)=>

      total +
      (user.donations?.length || 0),

    0

  );









  const totalAmount =
  donors.reduce(

    (total,user)=>

      total +

      (user.donations?.reduce(

        (sum,donation)=>

          sum +
          Number(donation.amount || 0),

        0

      ) || 0),

    0

  );








  const totalVolunteers =
  donors.filter(

    user =>

      user.volunteerStatus &&
      user.volunteerStatus !== "Not Applied"

  ).length;








  const filteredUsers =
  donors.filter(user=>{


    const searchValue =
    search.toLowerCase();




    const matchesSearch =

      user.name
      ?.toLowerCase()
      .includes(searchValue)

      ||

      user.email
      ?.toLowerCase()
      .includes(searchValue);






    const matchesFilter =

      filter === "all"

      ?

      true


      :


      filter === "volunteer"

      ?

      user.volunteerStatus !== "Not Applied"


      :

      user.volunteerStatus === filter;






    return (
      matchesSearch &&
      matchesFilter
    );


  });








  const openUser = (user)=>{

    setSelectedUser(user);

  };








  const closeModal = ()=>{

    setSelectedUser(null);

  };
    return (

    <div
      className="
      min-h-screen
      bg-[#F8F6F1]
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
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
          mb-10
          "
        >

          <div>

            <h1
              className="
              text-4xl
              font-bold
              text-[#2E332B]
              "
            >

              Admin Dashboard

            </h1>


            <p className="mt-2 text-gray-600">

              Manage donors, donations and volunteer activities.

            </p>

          </div>





          <button

            onClick={()=>{

              loadUsers();

              toast.success(
                "Dashboard refreshed"
              );

            }}

            className="
            bg-[#7A866E]
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:bg-[#667258]
            transition
            "

          >

            Refresh Data

          </button>


        </div>

        <EmergencyManagement />
        <RewardManagement />





        {/* STAT CARDS */}

        <section className="mt-14 border-t border-[#DCCFC0] pt-10">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#66785F]">Donation management</p><h2 className="mt-2 text-3xl font-bold text-[#2E332B]">Donation Overview</h2></div>
          <p className="text-sm text-gray-500">A snapshot of community support.</p>
        </div>

        <div
          className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-10
          "
        >


          <StatCard

            title="Total Donors"

            value={totalUsers}

            icon=""

          />



          <StatCard

            title="Total Donations"

            value={totalDonations}

            icon=""

          />



          <StatCard

            title="Amount Raised"

            value={`₹${totalAmount.toLocaleString()}`}

            icon=""

          />



          <StatCard

            title="Volunteers"

            value={totalVolunteers}

            icon=""

          />


        </div>

        </section>









        {/* SEARCH AND FILTER */}


        <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-6
          mb-8
          "
        >


          <div
            className="
            grid
            md:grid-cols-3
            gap-5
            "
          >



            <input

              type="text"

              placeholder="Search donor by name or email"

              value={search}


              onChange={(e)=>

                setSearch(
                  e.target.value
                )

              }


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









            <select

              value={filter}


              onChange={(e)=>

                setFilter(
                  e.target.value
                )

              }


              className="
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#7A866E]
              "

            >

              <option value="all">
                All Users
              </option>


              <option value="volunteer">
                Volunteers
              </option>


              <option value="Applied">
                Applied
              </option>


              <option value="Approved">
                Approved
              </option>


            </select>






            <div
              className="
              bg-[#F8F6F1]
              rounded-xl
              flex
              items-center
              justify-center
              font-semibold
              text-[#2E332B]
              "
            >

              Showing {filteredUsers.length} users

            </div>


          </div>


        </div>









        {/* DONOR TABLE */}


        <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-6
          "
        >


          <div className="mb-6">


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

              View and manage registered donors.

            </p>


          </div>








          {

            filteredUsers.length > 0

            ?

            <DonorTable

              users={filteredUsers}

              onView={openUser}

            />


            :


            <div
              className="
              text-center
              py-16
              "
            >


              <h3
                className="
                text-xl
                font-semibold
                text-[#2E332B]
                "
              >

                No users found

              </h3>



              <p
                className="
                text-gray-500
                mt-2
                "
              >

                Try changing your search or filter.

              </p>



            </div>


          }


        </div>









        {/* USER DETAILS MODAL */}


        {

          selectedUser &&


          <UserDetailsModal

            user={selectedUser}

            closeModal={closeModal}

          />


        }



      </div>


    </div>

  );

};


export default AdminDashboard;
