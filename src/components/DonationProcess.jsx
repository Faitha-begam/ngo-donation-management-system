const DonationProcess = () => {

  const steps = [
    {
      step: "01",
      title: "Choose A Campaign",
      text: "Select a cause that connects with you and understand how your support can help."
    },
    {
      step: "02",
      title: "Make A Donation",
      text: "Contribute securely and become a part of someone's journey towards a better future."
    },
    {
      step: "03",
      title: "We Create Impact",
      text: "Your contribution helps provide resources, opportunities and essential support."
    },
    {
      step: "04",
      title: "See The Change",
      text: "Follow the progress and witness the difference your kindness creates."
    }
  ];


  return (

    <section className="bg-[#66785F] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center text-white mb-16">

          <p className="uppercase tracking-[5px] text-sm mb-4">
            How It Works
          </p>

          <h2 className="text-5xl font-semibold">
            Your Donation Journey
          </h2>

        </div>


        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((item)=>(

            <div
              key={item.step}
              className="
                bg-white/10
                backdrop-blur
                rounded-[30px]
                p-8
                text-white
              "
            >

              <div className="
                w-14
                h-14
                rounded-full
                bg-white
                text-[#66785F]
                flex
                items-center
                justify-center
                font-bold
                text-xl
              ">
                {item.step}
              </div>


              <h3 className="text-xl font-semibold mt-6 mb-4">
                {item.title}
              </h3>


              <p className="text-white/80 leading-relaxed">
                {item.text}
              </p>


            </div>

          ))}

        </div>


      </div>

    </section>

  );
};


export default DonationProcess;