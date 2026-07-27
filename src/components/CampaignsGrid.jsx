import CampaignCard from "./CampaignCard";

const CampaignsGrid = ({ campaigns }) => {
  return (
    <section
      className="
        w-full
        py-16
        bg-[#FDF6ED]
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
        "
      >

        {/* Section Heading */}

        <div
          className="
            text-center
            mb-12
          "
        >

          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-[#2E332B]
              mb-4
            "
          >
            All Campaigns
          </h2>


          <p
            className="
              max-w-2xl
              mx-auto
              text-gray-600
              text-lg
            "
          >
            Explore our ongoing initiatives and support causes
            that create meaningful change in communities.
          </p>

        </div>



        {/* Campaign List */}

        <div
          className="
            space-y-8
          "
        >

          {campaigns.map((campaign) => (

            <CampaignCard
              key={campaign.id}
              campaign={campaign}
            />

          ))}

        </div>


      </div>

    </section>
  );
};

export default CampaignsGrid;