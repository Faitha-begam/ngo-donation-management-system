const VolunteerRoles = () => {
  const roles = [
    {
      number: "01",
      title: "Education Support",
      description:
        "Help children learn by supporting teaching programs, mentoring, and educational activities.",
    },
    {
      number: "02",
      title: "Community Outreach",
      description:
        "Work with local communities and assist in organizing awareness and support programs.",
    },
    {
      number: "03",
      title: "Event Assistance",
      description:
        "Support NGO events, campaigns, and activities that bring people together.",
    },
    {
      number: "04",
      title: "Fundraising Support",
      description:
        "Help spread awareness and support fundraising initiatives for important causes.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A2D]">
            Volunteer Opportunities
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
            Choose a role where your skills and interests can contribute
            towards creating a meaningful impact.
          </p>
        </div>


        {/* Roles List */}
        <div className="space-y-6">

          {roles.map((role) => (
            <div
              key={role.number}
              className="
                group
                flex
                flex-col
                md:flex-row
                md:items-center
                gap-6
                p-6
                md:p-8
                rounded-2xl
                bg-white
                border
                border-gray-100
                transition
                duration-300
                hover:shadow-lg
              "
            >

              {/* Number */}
              <div
                className="
                  text-4xl
                  font-bold
                  text-[#7A866E]
                  min-w-[80px]
                "
              >
                {role.number}
              </div>


              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-[#2F3A2D]">
                  {role.title}
                </h3>

                <p className="mt-2 text-gray-600 leading-relaxed">
                  {role.description}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default VolunteerRoles;