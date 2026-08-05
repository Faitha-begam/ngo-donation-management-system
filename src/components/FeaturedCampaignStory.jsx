import campaigns from "../data/campaigns";
import { Link } from "react-router-dom";

const FeaturedCampaign = () => {

  const campaign = campaigns.find(
    (item) => item.featured
  ) || campaigns[0];


  const progress =
    (campaign.raised / campaign.target) * 100;


  return (
    <section
      className="
        py-24
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

        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
            items-center
          "
        >


          {/* Image Side */}

          <div
            className="
              overflow-hidden
              rounded-[40px]
            "
          >

            <img
              src={`${campaign.image}?auto=format&fit=crop&w=1000&q=80`}
              alt={campaign.title}
              className="
                w-full
                h-[600px]
                object-cover
                hover:scale-105
                transition-transform
                duration-700
              "
            />

          </div>




          {/* Content Side */}

          <div>


            <p
              className="
                uppercase
                tracking-[5px]
                text-sm
                text-[#66785F]
                mb-6
              "
            >
              Featured Campaign
            </p>



            <h2
              className="
                text-4xl
                md:text-6xl
                font-semibold
                text-[#2E332B]
                leading-tight
                mb-8
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




            {/* Donation Numbers */}


            <div
              className="
                flex
                gap-12
                mb-8
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Raised
                </p>

                <h3
                  className="
                    text-3xl
                    font-bold
                    text-[#66785F]
                  "
                >
                  ₹{campaign.raised.toLocaleString()}
                </h3>

              </div>



              <div>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Goal
                </p>

                <h3
                  className="
                    text-3xl
                    font-bold
                    text-[#2E332B]
                  "
                >
                  ₹{campaign.target.toLocaleString()}
                </h3>

              </div>

            </div>





            {/* Progress */}


            <div
              className="
                mb-10
              "
            >

              <div
                className="
                  h-2
                  w-full
                  bg-[#DCCFC0]
                  rounded-full
                "
              >

                <div
                  className="
                    h-full
                    bg-[#66785F]
                    rounded-full
                  "
                  style={{
                    width:`${progress}%`
                  }}
                />

              </div>


              <p
                className="
                  mt-3
                  text-sm
                  text-gray-500
                "
              >
                {Math.round(progress)}% completed
              </p>


            </div>





            <Link to="/donate"
              className="
                px-10
                py-4
                rounded-full
                bg-[#66785F]
                text-white
                font-medium
                hover:bg-[#55664F]
                transition
              "
            >
              Support This Cause
            </Link>


          </div>


        </div>


      </div>


    </section>
  );
};


export default FeaturedCampaign;
