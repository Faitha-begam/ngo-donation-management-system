import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Impact from "../components/Impact";
import campaigns from "../data/campaigns";
import WhySupport from "../components/WhySupport";
import DonationProcess from "../components/DonationProcess";
import CampaignCTA from "../components/CampaignCTA";
import Faq from '../components/Faq'

const Campaigns = () => {

  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Education",
    "Healthcare",
    "Food",
    "Environment",
    "Community",
    "Animals",
  ];

  const filtered =
    category === "All"
      ? campaigns
      : campaigns.filter(
          (c) => c.category === category
        );

  return (
    <>

      {/* HERO */}

      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80)",
        }}
      >

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative max-w-7xl mx-auto px-6 text-white">

          <p className="uppercase tracking-[6px] mb-5 text-sm">
            Our Campaigns
          </p>

          <h1 className="text-6xl lg:text-8xl font-semibold leading-tight max-w-5xl">
            Together
            <br />
            We Create Hope
          </h1>

          <p className="mt-8 text-lg max-w-2xl text-white/90 leading-relaxed">
            Every donation helps provide education,
            healthcare, food and a better future for
            families in need.
          </p>

        </div>

      </section>



      {/* FILTER */}

      <section className="bg-white py-7 sticky top-[72px] z-30 border-b">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex gap-4 flex-wrap justify-center">

            {categories.map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-6 py-3 rounded-full transition ${
                  category === item
                    ? "bg-[#66785F] text-white"
                    : "bg-[#F5F5F5] hover:bg-[#66785F] hover:text-white"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </section>



      {/* CAMPAIGNS */}

      <section className="bg-[#FDF6ED] py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="space-y-28">

            {filtered.map((campaign, index) => {

              const reverse = index % 2 !== 0;

              const progress = Math.min(
                (campaign.raised / campaign.target) * 100,
                100
              );

              return (

                <div
                  key={campaign.id}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    reverse
                      ? "lg:[&>*:first-child]:order-2"
                      : ""
                  }`}
                >
                                      {/* Image */}

                  <div className="group overflow-hidden rounded-[32px] shadow-xl">

                    <img
                      src={`${campaign.image}?auto=format&fit=crop&w=1200&q=80`}
                      alt={campaign.title}
                      className="
                        w-full
                        h-[500px]
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                  </div>



                  {/* Content */}

                  <div>

                    <span
                      className="
                        inline-block
                        px-4
                        py-2
                        rounded-full
                        bg-[#66785F]/10
                        text-[#66785F]
                        font-medium
                        mb-5
                      "
                    >
                      {campaign.category}
                    </span>

                    <h2
                      className="
                        text-4xl
                        lg:text-5xl
                        font-semibold
                        text-[#2E332B]
                        leading-tight
                        mb-6
                      "
                    >
                      {campaign.title}
                    </h2>

                    <p
                      className="
                        text-lg
                        text-gray-600
                        leading-relaxed
                        mb-8
                      "
                    >
                      {campaign.story}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-8">

                      <div>
                        <p className="text-gray-500 text-sm">
                          Raised
                        </p>

                        <h3 className="text-3xl font-bold text-[#66785F]">
                          ₹{campaign.raised.toLocaleString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">
                          Goal
                        </p>

                        <h3 className="text-3xl font-bold text-[#2E332B]">
                          ₹{campaign.target.toLocaleString()}
                        </h3>
                      </div>

                    </div>

                    {/* Progress */}

                    <div className="mb-10">

                      <div className="w-full h-3 bg-[#DCCFC0] rounded-full overflow-hidden">

                        <div
                          className="h-full bg-[#66785F]"
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                      <div className="flex justify-between mt-3 text-sm text-gray-500">

                        <span>
                          {campaign.supporters} Supporters
                        </span>

                        <span>
                          {Math.round(progress)}% Funded
                        </span>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-4">

                      <button
                        className="
                          px-8
                          py-4
                          rounded-full
                          bg-[#66785F]
                          text-white
                          font-semibold
                          hover:bg-[#55664F]
                          transition
                        "
                      >
                        Donate Now
                      </button>

                      <button
                        className="
                          px-8
                          py-4
                          rounded-full
                          border
                          border-[#66785F]
                          text-[#66785F]
                          font-semibold
                          hover:bg-[#66785F]
                          hover:text-white
                          transition
                        "
                      >
                        Learn More
                      </button>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </section>

   <WhySupport/>

   <DonationProcess/>

   <CampaignCTA/>

   <Faq/>
    </>
  );
};

export default Campaigns;