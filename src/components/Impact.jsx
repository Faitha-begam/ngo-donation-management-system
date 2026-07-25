import {
  FaHeart,
  FaUsers,
  FaBullseye,
  FaHandHoldingHeart,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaHeart />,
    number: "10,250+",
    title: "Lives Helped",
    color: "text-red-500",
    bg: "bg-red-100",
  },
  {
    icon: <FaUsers />,
    number: "3,500+",
    title: "Donors",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: <FaBullseye />,
    number: "12",
    title: "Active Campaigns",
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    icon: <FaHandHoldingHeart />,
    number: "₹45,00,000+",
    title: "Total Raised",
    color: "text-orange-500",
    bg: "bg-orange-100",
  },
];

const Impact = () => {
  return (
    <section className="py-20 bg-[#F8F8F5]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-[#7A866E] font-semibold uppercase tracking-[3px]">
            Our Impact
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#3A4035] mt-3">
            Together, We Are Changing Lives
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 text-lg leading-8">
            Every donation, every volunteer, and every campaign brings us
            one step closer to building stronger communities and creating
            lasting positive change.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center text-3xl ${item.color}`}
              >
                {item.icon}
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#3A4035]">
                  {item.number}
                </h3>

                <p className="text-gray-500">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Impact;