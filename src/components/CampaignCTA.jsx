import { Link } from "react-router-dom";

const CampaignCTA = () => {

  return (

    <section className="bg-[#FDF6ED] py-24">

      <div className="
        max-w-6xl
        mx-auto
        px-6
      ">

        <div
          className="
            bg-[#2E332B]
            rounded-[40px]
            p-12
            lg:p-20
            text-center
            text-white
          "
        >

          <p className="uppercase tracking-[5px] text-sm text-white/70 mb-5">
            Join The Movement
          </p>


          <h2 className="
            text-5xl
            lg:text-6xl
            font-semibold
            leading-tight
          ">
            Don't Just Watch
            <br />
            Change The Future
          </h2>


          <p className="
            max-w-2xl
            mx-auto
            mt-6
            text-white/80
            text-lg
          ">
            Whether through donations, volunteering, or sharing our mission,
            every action helps us reach more lives.
          </p>


          <div className="flex justify-center gap-5 mt-10 flex-wrap">

            <Link to="/donate"
              className="
                bg-white
                text-[#2E332B]
                px-10
                py-4
                rounded-full
                font-semibold
                hover:scale-105
                transition
              "
            >
              Donate Now
            </Link>


            <Link to="/volunteer"
              className="
                border
                border-white/40
                px-10
                py-4
                rounded-full
                font-semibold
                hover:bg-white
                hover:text-[#2E332B]
                transition
              "
            >
              Become A Volunteer
            </Link>

          </div>


        </div>

      </div>

    </section>

  );

};


export default CampaignCTA;
