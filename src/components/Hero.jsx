import banner from "../assets/homeBanner.jpg";

const Hero = () => {
  return (
    <section
      className="
        w-full
        h-[calc(100vh-96px)]
        bg-no-repeat
        bg-cover
        bg-center 
        flex
        items-center
      "
      style={{
        backgroundImage: `url(${banner})`,
        backgroundPosition: "center 20%",
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
        <div className="max-w-lg">

          <span className="inline-block text-[#7A866E] font-semibold tracking-wider uppercase mb-3">
            Make a Difference Today
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#3A4035] leading-tight">
            Every Donation
            <br />
            Creates Hope.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Support food distribution, blood donation drives, education for
            underprivileged children, healthcare initiatives, and community
            welfare campaigns. Together, we can build a brighter future.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="bg-[#7A866E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#65735A] transition duration-300">
              Donate Now
            </button>

            <button className="border-2 border-[#7A866E] text-[#7A866E] px-8 py-3 rounded-full font-semibold hover:bg-[#7A866E] hover:text-white transition duration-300">
              Explore Campaigns
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;