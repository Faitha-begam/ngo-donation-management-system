const VolunteerTestimonials = () => {
  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "Education Volunteer",
      message:
        "Volunteering gave me the opportunity to teach children and be a part of their learning journey. Every small effort feels meaningful.",
    },
    {
      name: "Rahul Kumar",
      role: "Community Volunteer",
      message:
        "Working with the NGO helped me understand real community challenges and inspired me to contribute more.",
    },
    {
      name: "Priya Menon",
      role: "Event Volunteer",
      message:
        "The experience was amazing. I met wonderful people and learned how teamwork can create a bigger impact.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A2D]">
            Stories From Our Volunteers
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Hear from people who have joined our mission and contributed
            towards creating a better tomorrow.
          </p>
        </div>


        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                relative
                p-8
                rounded-3xl
                bg-[#F8F6F1]
                border
                border-gray-100
              "
            >

              {/* Quote */}
              <div className="text-5xl text-[#7A866E] font-serif">
                "
              </div>


              <p className="mt-4 text-gray-600 leading-relaxed">
                {item.message}
              </p>


              {/* Person */}
              <div className="mt-6">

                <h3 className="font-semibold text-[#2F3A2D]">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.role}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default VolunteerTestimonials;