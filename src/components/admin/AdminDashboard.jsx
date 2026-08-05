import { useState, useEffect } from "react";

import { getUsers } from "../../utils/auth";
import { getDonations, updateDonationStatus } from "../../utils/adminService";
import { CheckCircle, History, ReceiptText, X, XCircle } from "lucide-react";

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
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [historyDonor, setHistoryDonor] = useState(null);

  const [selectedUser,setSelectedUser] = useState(null);

  const [search,setSearch] = useState("");

  const [filter,setFilter] = useState("all");







  useEffect(()=>{

    loadUsers();

  },[]);








  const loadUsers = () => {

    const storedUsers = getUsers();

    setUsers(storedUsers);
    setDonations(getDonations());

  };

  const handleDonationReview = (donation, status) => {
    const rejectionReason = status === "Rejected"
      ? (window.prompt("Optional rejection reason:") || "")
      : "";
    updateDonationStatus(donation.id, status, rejectionReason);
    loadUsers();
  };

  const getDonorHistory = (donor) => donations.filter((item) =>
    (donor.donorId && String(item.donorId) === String(donor.donorId)) ||
    (donor.userId && String(item.donorId || item.userId) === String(donor.userId)) ||
    (donor.email && item.email === donor.email)
  );






  // ADDED: remove admin from donor calculations
  const donors = users.filter(
    user => user.role !== "admin"
  );







  const totalUsers =
  donors.length;








  const approvedDonations = donations.filter(
    donation => donation.status === "Approved"
  );

  const totalDonations = approvedDonations.length;









  const totalAmount = approvedDonations.reduce(
    (total, donation) => total + Number(donation.amount || 0),
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

        <div className="overflow-x-auto rounded-3xl border border-[#E9E0D5] bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F8F6F1] text-xs font-bold uppercase tracking-wide text-[#66785F]"><tr><th className="px-5 py-4">Donor</th><th className="px-5 py-4">Campaign</th><th className="px-5 py-4">Amount</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Payment</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Actions</th></tr></thead>
            <tbody>{donations.length ? donations.slice().reverse().map((donation) => {
              const status = donation.status === "Completed" ? "Pending Review" : (donation.status || "Pending Review");
              const statusClass = status === "Approved" ? "bg-green-100 text-green-700" : status === "Rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800";
              return (
                <tr key={donation.id} className="border-t border-[#E9E0D5] transition hover:bg-[#F8F6F1]">
                  <td className="px-5 py-4"><p className="font-bold text-[#2E332B]">{donation.name || "Unknown donor"}</p><p className="mt-1 text-xs text-gray-500">{donation.email || "No email"}</p></td>
                  <td className="px-5 py-4 font-medium text-[#2E332B]">{donation.campaign}</td>
                  <td className="px-5 py-4 font-bold text-[#66785F]">{`₹${Number(donation.amount || 0).toLocaleString()}`}</td>
                  <td className="px-5 py-4 text-gray-600">{new Date(donation.createdAt || donation.date).toLocaleDateString()}</td>
                  <td className="px-5 py-4 capitalize text-gray-600">{donation.paymentMethod || "—"}</td>
                  <td className="px-5 py-4"><span className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusClass}`}>{status}</span>{status === "Rejected" && donation.rejectionReason && <p className="mt-2 max-w-40 text-xs text-red-600">{donation.rejectionReason}</p>}</td>
                  <td className="px-5 py-4 text-right"><div className="flex min-w-max items-center justify-end gap-2"><button type="button" onClick={() => setHistoryDonor(donation)} title="View donation history" aria-label="View donation history" className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7DB] text-[#66785F] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#66785F] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#66785F] focus:ring-offset-2"><History className="h-4 w-4" /></button><button type="button" onClick={() => setSelectedDonation(donation)} title="View donation receipt" aria-label="View donation receipt" className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7DB] text-[#66785F] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#66785F] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#66785F] focus:ring-offset-2"><ReceiptText className="h-4 w-4" /></button>{status === "Pending Review" && <div className="ml-1 flex gap-2"><button onClick={() => handleDonationReview(donation, "Approved")} className="rounded-xl bg-[#66785F] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#55664F]"><CheckCircle className="mr-1 inline h-3.5 w-3.5" />Approve</button><button onClick={() => handleDonationReview(donation, "Rejected")} className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700"><XCircle className="mr-1 inline h-3.5 w-3.5" />Reject</button></div>}</div></td>
                </tr>
              );
            }) : <tr><td colSpan="7" className="px-5 py-10 text-center text-gray-500">No donations to review.</td></tr>}</tbody>
          </table>
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









        {selectedDonation && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2E332B]/45 p-4" role="dialog" aria-modal="true" aria-label="Donation receipt"><div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#66785F]">Donation details</p><h2 className="mt-1 text-2xl font-bold text-[#2E332B]">Receipt review</h2></div><button type="button" onClick={() => setSelectedDonation(null)} aria-label="Close donation receipt" className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7DB] text-[#66785F] transition hover:bg-[#66785F] hover:text-white"><X className="h-4 w-4" /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><DonationDetail label="Donor" value={selectedDonation.name || "Unknown donor"} /><DonationDetail label="Campaign" value={selectedDonation.campaign || "Not specified"} /><DonationDetail label="Amount" value={`₹${Number(selectedDonation.amount || 0).toLocaleString()}`} /><DonationDetail label="Donation date" value={new Date(selectedDonation.createdAt || selectedDonation.date).toLocaleDateString()} /><DonationDetail label="Payment method" value={selectedDonation.paymentMethod || "Not available"} /><DonationDetail label="Donation type" value={selectedDonation.frequency || selectedDonation.type || "Not available"} /><DonationDetail label="Status" value={selectedDonation.status === "Completed" ? "Pending Review" : (selectedDonation.status || "Pending Review")} /><DonationDetail label="Reference ID" value={selectedDonation.transactionId || selectedDonation.referenceId || selectedDonation.id || "Not available"} /></div></div></div>}

        {historyDonor && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2E332B]/45 p-4" role="dialog" aria-modal="true" aria-label="Donation history"><div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#66785F]">Donor activity</p><h2 className="mt-1 text-2xl font-bold text-[#2E332B]">{historyDonor.name || "Donor"}&apos;s donation history</h2><p className="mt-1 text-sm text-gray-500">{historyDonor.email || "No email available"}</p></div><button type="button" onClick={() => setHistoryDonor(null)} aria-label="Close donation history" className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7DB] text-[#66785F] transition hover:bg-[#66785F] hover:text-white"><X className="h-4 w-4" /></button></div><div className="mt-6 max-h-[55vh] space-y-3 overflow-y-auto pr-1">{getDonorHistory(historyDonor).length ? getDonorHistory(historyDonor).slice().reverse().map((item) => <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-[#E9E0D5] bg-[#F8F6F1] p-4"><div><p className="font-bold text-[#2E332B]">{item.campaign || "General donation"}</p><p className="mt-1 text-xs text-gray-500">{new Date(item.createdAt || item.date).toLocaleDateString()} · {item.paymentMethod || "Payment method unavailable"}</p></div><p className="shrink-0 font-bold text-[#66785F]">{`₹${Number(item.amount || 0).toLocaleString()}`}</p></div>) : <p className="rounded-2xl bg-[#F8F6F1] px-4 py-8 text-center text-sm text-gray-500">No donations found for this donor.</p>}</div></div></div>}

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

function DonationDetail({ label, value }) {
  return <div className="rounded-2xl border border-[#E9E0D5] bg-[#F8F6F1] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#66785F]">{label}</p><p className="mt-2 break-words font-semibold text-[#2E332B]">{value}</p></div>;
}
