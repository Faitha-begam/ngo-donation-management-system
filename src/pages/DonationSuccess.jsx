import { Link, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const DonationSuccess = () => {
  const location = useLocation();

  // Data received from Donate page
  const donation = location.state || {
    name: "Anonymous Donor",
    amount: "500",
    campaign: "Provide Education for Underprivileged Children",
    id: "NGO20260728001",
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center px-6 py-12">

      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <CheckCircle
              size={70}
              className="text-green-600"
            />
          </div>
        </div>


        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#3F4A36] mb-4">
          Donation Successful!
        </h1>


        <p className="text-gray-600 text-lg mb-8">
          Thank you for your generous contribution.
          Your support helps us create a better future.
        </p>



        {/* Donation Details */}
        <div className="bg-[#F8F7F2] rounded-2xl p-6 text-left space-y-4 mb-8">

          <div className="flex justify-between">
            <span className="text-gray-600">
              Donor Name
            </span>

            <span className="font-semibold">
              {donation.name}
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-600">
              Donation Amount
            </span>

            <span className="font-semibold text-[#7A866E]">
              ₹{donation.amount}
            </span>
          </div>


          <div className="flex justify-between gap-4">
            <span className="text-gray-600">
              Campaign
            </span>

            <span className="font-semibold text-right">
              {donation.campaign}
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-600">
              Donation ID
            </span>

            <span className="font-semibold">
              {donation.id}
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-600">
              Date
            </span>

            <span className="font-semibold">
              {new Date().toLocaleDateString()}
            </span>
          </div>

        </div>



        {/* Impact Message */}
        <div className="mb-8">

          <h2 className="text-2xl font-semibold text-[#3F4A36] mb-3">
            Your Impact Matters ❤️
          </h2>

          <p className="text-gray-600">
            Every donation brings us one step closer to supporting
            communities, providing education, healthcare and hope
            for those who need it most.
          </p>

        </div>



        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">


          <Link
            to="/campaigns"
            className="
            px-8 py-3
            bg-[#7A866E]
            text-white
            rounded-full
            font-semibold
            hover:bg-[#68745E]
            transition
            "
          >
            Explore Campaigns
          </Link>


          <Link
            to="/"
            className="
            px-8 py-3
            border-2
            border-[#7A866E]
            text-[#7A866E]
            rounded-full
            font-semibold
            hover:bg-[#7A866E]
            hover:text-white
            transition
            "
          >
            Back To Home
          </Link>


        </div>


      </div>

    </div>
  );
};


export default DonationSuccess;