const WhySupport = () => {
  const reasons = [
    {
      number: "01",
      title: "Transparent Donations",
      description:
        "Every contribution is handled responsibly with complete transparency, ensuring your support reaches the right people."
    },
    {
      number: "02",
      title: "Direct Community Impact",
      description:
        "We work closely with communities to identify real problems and create meaningful solutions."
    },
    {
      number: "03",
      title: "Long-Term Change",
      description:
        "Our goal is not temporary relief but creating opportunities that transform lives permanently."
    }
  ];

  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-[#66785F] text-sm font-semibold mb-4">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-semibold text-[#2E332B]">
            Your Support Creates
            <br />
            Meaningful Change
          </h2>

        </div>


        <div className="grid md:grid-cols-3 gap-8">

          {reasons.map((item) => (

            <div
              key={item.number}
              className="
                p-8
                rounded-[30px]
                bg-[#FDF6ED]
                hover:-translate-y-2
                transition
                duration-300
              "
            >

              <span className="text-5xl font-bold text-[#66785F]">
                {item.number}
              </span>

              <h3 className="text-2xl font-semibold text-[#2E332B] mt-6 mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};


export default WhySupport;