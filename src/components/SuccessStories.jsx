import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import story1 from "../assets/successstories/story1.jpg";
import story2 from "../assets/successstories/story2.jpg";
import story3 from "../assets/successstories/story3.jpg";

import ctaBanner from "../assets/successstories/ctaBanner.jpg";
const stories = [
  {
    id: 1,
    image: story1,
    name: "Meena R.",
    role: "Flood Relief Beneficiary",
    quote:
      "When floods destroyed our home, your support provided food, shelter, and hope. Today, my family is rebuilding our lives with confidence.",
  },
  {
    id: 2,
    image: story2,
    name: "Arun K.",
    role: "Education Support Beneficiary",
    quote:
      "Receiving books and school supplies allowed me to continue my education. I now dream of becoming an engineer.",
  },
  {
    id: 3,
    image: story3,
    name: "Lakshmi P.",
    role: "Healthcare Beneficiary",
    quote:
      "The medical camp gave me treatment I couldn't afford. I'm healthy again and able to care for my family.",
  },
];

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const prevStory = () => {
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setCurrent((prev) => (prev + 1) % stories.length);
  };

 return (
  <>
    {/* ================= Success Stories ================= */}
    <section className="bg-[#F8F6F0] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2F4F3E]">
            Success Stories
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Every donation changes lives. Read inspiring stories from the
            people whose futures have been transformed through your kindness.
          </p>
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={stories[current].image}
                alt={stories[current].name}
                className="w-80 h-80 object-cover rounded-3xl shadow-lg"
              />
            </div>

            {/* Content */}
            <div>
              <span className="text-6xl text-[#7A866E]">“</span>

              <p className="text-lg text-gray-700 leading-8 italic">
                {stories[current].quote}
              </p>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#2F4F3E]">
                  {stories[current].name}
                </h3>

                <p className="text-[#7A866E] font-medium">
                  {stories[current].role}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-10">
                <button
                  onClick={prevStory}
                  className="w-10 h-10 rounded-full bg-[#7A866E] text-white hover:bg-[#65735C] transition"
                >
                  ←
                </button>

                <div className="flex gap-2">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-3 h-3 rounded-full transition ${
                        current === index
                          ? "bg-[#7A866E] w-8"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextStory}
                  className="w-10 h-10 rounded-full bg-[#7A866E] text-white hover:bg-[#65735C] transition"
                >
                  →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    {/* ================= CTA Section ================= */}
    <section
      className="relative h-[400px] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${ctaBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Be the Reason for Someone's Smile
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-200 leading-8">
          Your kindness can provide food, education, healthcare, and hope to
          families in need. Every donation creates a brighter tomorrow.
        </p>

        <Link to="/donate" className="mt-10 inline-block bg-[#7A866E] hover:bg-[#66755A] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
          Donate Now
        </Link>
      </div>
    </section>
  </>
);
};

export default SuccessStories;
