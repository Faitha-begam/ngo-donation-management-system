const VolunteerIntro = () => {
  return (
    <section className="w-full pt-32 pb-20 px-6 bg-[#F8F6F1]">
      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#2F3A2D] leading-tight">
          Become a Volunteer
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          Your time, skills, and passion can create meaningful change.
          Join our community of volunteers and help us support people
          who need it the most.
        </p>

        {/* CTA */}
        <button
          className="
            mt-8
            px-8
            py-3
            rounded-full
            bg-[#7A866E]
            text-white
            font-medium
            transition
            duration-300
            hover:bg-[#667258]
            hover:-translate-y-1
            shadow-md
          "
        >
          Join as Volunteer
        </button>

      </div>
    </section>
  );
};

export default VolunteerIntro;