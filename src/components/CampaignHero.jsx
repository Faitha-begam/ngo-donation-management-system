const CampaignHero = () => {
  return (
    <section
      className="
        relative
        h-[90vh]
        flex
        items-center
        bg-cover
        bg-center
      "
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c)",
      }}
    >

      {/* Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
      />


      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          text-white
        "
      >

        <p
          className="
            uppercase
            tracking-[6px]
            text-sm
            mb-6
          "
        >
          Our Campaigns
        </p>


        <h1
          className="
            text-5xl
            md:text-7xl
            lg:text-8xl
            font-semibold
            leading-[1.05]
            max-w-5xl
          "
        >
          Every small action
          creates a bigger change
        </h1>


        <p
          className="
            mt-8
            text-lg
            md:text-xl
            max-w-2xl
            text-white/90
            leading-relaxed
          "
        >
          Join hands with us to support education,
          healthcare, food security and community
          development initiatives.
        </p>


        <button
          className="
            mt-10
            px-8
            py-4
            rounded-full
            bg-[#66785F]
            text-white
            font-medium
            hover:bg-[#55664F]
            transition
          "
        >
          Explore Campaigns
        </button>


      </div>

    </section>
  );
};

export default CampaignHero;