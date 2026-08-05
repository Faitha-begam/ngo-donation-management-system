import campaigns from "../data/campaigns";
import { Link } from "react-router-dom";

const CampaignStories = () => {
  // Skip the featured campaign
  const stories = campaigns.filter((campaign) => !campaign.featured);

  return (
    <section className="bg-[#FDF6ED] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-24">
          <p className="uppercase tracking-[5px] text-[#66785F] text-sm font-semibold mb-4">
            Active Campaigns
          </p>

          <h2 className="text-4xl md:text-6xl font-semibold text-[#2E332B] mb-6">
            Every Donation Tells
            <br />
            A Different Story
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Every campaign represents lives waiting to be changed.
            Explore our ongoing initiatives and become part of a
            story that creates lasting impact.
          </p>
        </div>

        <div className="relative">

          {/* Vertical Timeline */}

          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#DCCFC0] -translate-x-1/2"></div>

          {stories.map((campaign, index) => {

            const progress = Math.min(
              (campaign.raised / campaign.target) * 100,
              100
            );

            const reverse = index % 2 !== 0;

            return (
              <div
                key={campaign.id}
                className={`
                  relative
                  grid
                  lg:grid-cols-2
                  gap-14
                  items-center
                  mb-28
                  ${
                    reverse
                      ? "lg:[&>*:first-child]:order-2"
                      : ""
                  }
                `}
              >

                {/* Timeline Circle */}

                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#66785F] text-white font-bold items-center justify-center shadow-xl z-20">
                  {String(index + 2).padStart(2, "0")}
                </div>

                {/* Image */}

                <div className="overflow-hidden rounded-[32px] shadow-xl group">
                  <img
                    src={`${campaign.image}?auto=format&fit=crop&w=1200&q=80`}
                    alt={campaign.title}
                    className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                {/* Content */}

                <div>

                  <span className="inline-block px-5 py-2 rounded-full bg-[#66785F]/10 text-[#66785F] font-medium mb-6">
                    {campaign.category}
                  </span>

                  <h3 className="text-4xl font-semibold text-[#2E332B] mb-6 leading-tight">
                    {campaign.title}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {campaign.story}
                  </p>

                  <div className="flex gap-10 mb-8">

                    <div>
                      <p className="text-sm text-gray-500">
                        Raised
                      </p>

                      <h4 className="text-3xl font-bold text-[#66785F]">
                        ₹{campaign.raised.toLocaleString()}
                      </h4>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Goal
                      </p>

                      <h4 className="text-3xl font-bold text-[#2E332B]">
                        ₹{campaign.target.toLocaleString()}
                      </h4>
                    </div>

                  </div>

                  {/* Progress */}

                  <div className="mb-8">

                    <div className="w-full h-2 bg-[#DCCFC0] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#66785F] rounded-full transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                      {Math.round(progress)}% funded
                    </p>

                  </div>
                                    <div className="flex flex-wrap gap-4">

                    <Link to="/donate"
                      className="
                        px-8
                        py-3
                        rounded-full
                        bg-[#66785F]
                        text-white
                        font-medium
                        hover:bg-[#55664F]
                        transition-all
                        duration-300
                        hover:shadow-lg
                      "
                    >
                      Donate Now
                    </Link>

                    <Link to={`/campaigns#campaign-${campaign.id}`}
                      className="
                        px-8
                        py-3
                        rounded-full
                        border
                        border-[#66785F]
                        text-[#66785F]
                        font-medium
                        hover:bg-[#66785F]
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      Read Story
                    </Link>

                  </div>

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
};

export default CampaignStories;
