import { HeartHandshake, Users, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Trusted Donations",
    description:
      "Every contribution reaches meaningful campaigns with complete transparency.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description:
      "Join thousands of volunteers and donors creating positive change.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your information stays securely stored while supporting important causes.",
  },
];

const AuthBanner = () => {
  return (
    <div className="hidden lg:flex relative bg-[#7A866E] text-white p-14 overflow-hidden">

      {/* Decorative Circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5"></div>

      <div className="relative z-10 flex flex-col justify-between h-full">

        <div>
          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm tracking-wide">
            NGO Donation Management
          </span>

          <h2 className="text-5xl font-bold mt-8 leading-tight">
            Together We Can
            <br />
            Change Lives.
          </h2>

          <p className="mt-6 text-lg text-gray-200 leading-8 max-w-lg">
            Every donation, every volunteer, and every supporter helps
            create opportunities for children, families, and communities
            in need.
          </p>
        </div>

        <div className="space-y-6 mt-14">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-4"
            >
              <div className="bg-white/20 p-3 rounded-xl">
                <Icon size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {title}
                </h3>

                <p className="text-gray-200 text-sm mt-1 leading-6">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AuthBanner;