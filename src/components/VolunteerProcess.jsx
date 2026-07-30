const VolunteerProcess = () => {
  const steps = [
    {
      step: "01",
      title: "Submit Application",
      description:
        "Fill out the volunteer form with your details, skills, and areas where you would like to contribute.",
    },
    {
      step: "02",
      title: "Application Review",
      description:
        "Our team will review your application and understand how your interests match our ongoing programs.",
    },
    {
      step: "03",
      title: "Volunteer Orientation",
      description:
        "Get introduced to our mission, projects, and the responsibilities of your volunteer role.",
    },
    {
      step: "04",
      title: "Start Making Impact",
      description:
        "Begin your volunteering journey and contribute towards creating positive change.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A2D]">
            How It Works
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Becoming a volunteer is simple. Follow these steps and start
            contributing to meaningful causes.
          </p>
        </div>


        {/* Timeline */}
        <div className="relative">

          {/* Vertical Line */}
          <div
            className="
              hidden
              md:block
              absolute
              left-1/2
              top-0
              bottom-0
              w-[2px]
              bg-[#D9DDCF]
              -translate-x-1/2
            "
          />


          <div className="space-y-10">

            {steps.map((item, index) => (
              <div
                key={item.step}
                className={`
                  relative
                  flex
                  flex-col
                  md:flex-row
                  items-center
                  gap-8
                  ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }
                `}
              >

                {/* Step Content */}
                <div
                  className="
                    w-full
                    md:w-5/12
                    bg-[#F8F6F1]
                    p-6
                    rounded-2xl
                    border
                    border-gray-100
                  "
                >
                  <h3 className="text-xl font-semibold text-[#2F3A2D]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>


                {/* Step Number */}
                <div
                  className="
                    relative
                    z-10
                    w-14
                    h-14
                    rounded-full
                    bg-[#7A866E]
                    text-white
                    flex
                    items-center
                    justify-center
                    font-semibold
                    shadow-md
                  "
                >
                  {item.step}
                </div>


                {/* Empty Space */}
                <div className="hidden md:block md:w-5/12" />

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default VolunteerProcess;