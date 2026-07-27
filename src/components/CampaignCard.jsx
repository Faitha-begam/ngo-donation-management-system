const CampaignCard = ({ campaign }) => {
  const progress = Math.min(
    (campaign.raised / campaign.target) * 100,
    100
  );

  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        border
        border-[#DCCFC0]
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
        flex
        flex-col
        md:flex-row
      "
    >
      {/* Campaign Image */}

      <div
        className="
          md:w-[35%]
          h-64
          md:h-auto
          overflow-hidden
        "
      >
        <img
          src={`${campaign.image}?auto=format&fit=crop&w=800&q=80`}
          alt={campaign.title}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-110
            transition-transform
            duration-500
          "
        />
      </div>


      {/* Campaign Content */}

      <div
        className="
          flex-1
          p-6
          md:p-8
          flex
          flex-col
          justify-between
        "
      >

        <div>

          {/* Category */}

          <span
            className="
              inline-block
              px-4
              py-1
              rounded-full
              bg-[#FDF6ED]
              text-[#66785F]
              text-sm
              font-medium
              mb-4
            "
          >
            {campaign.category}
          </span>


          {/* Title */}

          <h2
            className="
              text-2xl
              font-bold
              text-[#2E332B]
              mb-3
              group-hover:text-[#66785F]
              transition
            "
          >
            {campaign.title}
          </h2>


          {/* Description */}

          <p
            className="
              text-gray-600
              leading-relaxed
              mb-5
            "
          >
            {campaign.description}
          </p>


          {/* Location */}

          <p
            className="
              text-sm
              text-gray-500
              mb-5
            "
          >
            📍 {campaign.location}
          </p>


          {/* Progress Section */}

          <div className="mb-5">

            <div
              className="
                flex
                justify-between
                text-sm
                font-medium
                mb-2
              "
            >

              <span className="text-[#66785F]">
                ₹{campaign.raised.toLocaleString()}
                {" "}
                raised
              </span>

              <span className="text-gray-500">
                Goal ₹{campaign.target.toLocaleString()}
              </span>

            </div>


            <div
              className="
                w-full
                h-3
                bg-[#F0E8DD]
                rounded-full
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  bg-[#66785F]
                  rounded-full
                  transition-all
                  duration-700
                "
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>


            <p
              className="
                text-xs
                text-gray-500
                mt-2
              "
            >
              {Math.round(progress)}% completed
            </p>

          </div>


          {/* Supporters */}

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-600
            "
          >
            <span>
              ❤️
            </span>

            <span>
              {campaign.supporters} supporters
            </span>

          </div>

        </div>



        {/* Donate Button */}

        <div className="mt-6">

          <button
            className="
              bg-[#66785F]
              text-white
              px-7
              py-3
              rounded-full
              font-semibold
              hover:bg-[#55664F]
              transition
              duration-300
              shadow-md
              hover:shadow-lg
            "
          >
            Donate Now
          </button>

        </div>


      </div>

    </div>
  );
};

export default CampaignCard;