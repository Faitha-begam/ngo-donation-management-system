import foodImg from "../assets/featuredcampaigns/food.jpg";
import educationImg from "../assets/featuredcampaigns/education.jpg";
import bloodImg from "../assets/featuredcampaigns/blood.jpg";
import floodImg from "../assets/featuredcampaigns/flood.jpg";
import { Link } from "react-router-dom";

const featuredCampaigns = [
  {
    id: 1,
    title: "Food for Every Family",
    description:
      "Provide nutritious meals to families struggling with hunger.",
    image: foodImg,
    raised: 72500,
    goal: 100000,
  },
  {
    id: 2,
    title: "Education for Every Child",
    description:
      "Support children's education with books and supplies.",
    image: educationImg,
    raised: 48000,
    goal: 80000,
  },
  {
    id: 3,
    title: "Blood Donation Drive",
    description:
      "Support life-saving blood donation camps in local communities.",
    image: bloodImg,
    raised: 35000,
    goal: 50000,
  },
 {
  id: 4,
  title: "Flood Relief Fund",
  description:
    "Support flood-affected families with food, shelter, and clean water.",
  image: floodImg,
  raised: 56000,
  goal: 90000,
},
];

const FeaturedCampaigns = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">

          <div>
            <p className="uppercase tracking-[3px] font-semibold text-[#7A866E]">
              Featured Campaigns
            </p>

            <h2 className="text-4xl font-bold text-[#3A4035] mt-2">
              Support a Cause That Matters
            </h2>

            <p className="mt-4 max-w-2xl text-gray-600">
              Join our ongoing campaigns and help bring positive change to
              communities through food, education, healthcare, blood donation,
              and environmental initiatives.
            </p>
          </div>

          <Link to="/campaigns" className="mt-6 md:mt-0 border-2 border-[#7A866E] text-[#7A866E] px-6 py-3 rounded-full font-semibold hover:bg-[#7A866E] hover:text-white transition duration-300">
            View All Campaigns →
          </Link>

        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {featuredCampaigns.map((campaign) => {

            const percentage = Math.round(
              (campaign.raised / campaign.goal) * 100
            );

            return (
              <div
                key={campaign.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >

                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-xl font-bold text-[#3A4035]">
                    {campaign.title}
                  </h3>

                  <p className="mt-3 text-gray-600 text-sm leading-6">
                    {campaign.description}
                  </p>

                  {/* Progress */}
                  <div className="mt-5">

                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">
                        ₹{campaign.raised.toLocaleString()}
                      </span>

                      <span className="text-[#7A866E] font-semibold">
                        {percentage}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full">

                      <div
                        className="h-2 bg-[#7A866E] rounded-full"
                        style={{ width: `${percentage}%` }}
                      />

                    </div>

                  </div>

                  <Link
  to="/donate"
  className="
    block
    w-full
    mt-6
    bg-[#7A866E]
    text-white
    py-3
    rounded-xl
    font-semibold
    text-center
    hover:bg-[#65735A]
    transition
    duration-300
  "
>
  Donate Now
</Link>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default FeaturedCampaigns;
