const VolunteerBenefits = () => {
  const benefits = [
    {
      icon: "❤️",
      title: "Create Real Impact",
      description:
        "Contribute your time and skills to support communities and improve lives.",
    },
    {
      icon: "🤝",
      title: "Connect With People",
      description:
        "Work alongside passionate volunteers and build meaningful relationships.",
    },
    {
      icon: "🌱",
      title: "Develop New Skills",
      description:
        "Gain practical experience while participating in social initiatives.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A2D]">
            Why Volunteer With Us?
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Volunteering is more than giving your time. It is about creating
            connections, learning new skills, and making a positive difference.
          </p>
        </div>


        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="
                p-8
                rounded-2xl
                bg-[#F8F6F1]
                border
                border-gray-100
                transition
                duration-300
                hover:-translate-y-2
                hover:shadow-lg
              "
            >

              <div className="text-4xl mb-5">
                {benefit.icon}
              </div>

              <h3 className="text-xl font-semibold text-[#2F3A2D]">
                {benefit.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                {benefit.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default VolunteerBenefits;