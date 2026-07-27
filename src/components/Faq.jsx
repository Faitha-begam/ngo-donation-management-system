import { useState } from "react";

const FAQ = () => {

  const [activeIndex, setActiveIndex] = useState(null);


  const questions = [
    {
      question: "Where does my donation go?",
      answer:
        "Your donation directly supports our campaigns including education, healthcare, food support, and community development programs."
    },
    {
      question: "How can I know my contribution creates an impact?",
      answer:
        "We regularly share campaign updates, success stories, and impact reports to show how contributions are helping communities."
    },
    {
      question: "Can I donate to a specific campaign?",
      answer:
        "Yes. You can choose any campaign that connects with you and contribute directly towards that cause."
    },
    {
      question: "Is my donation secure?",
      answer:
        "Yes. We use secure payment methods to ensure your donation and personal information remain protected."
    },
    {
      question: "Can I volunteer instead of donating?",
      answer:
        "Absolutely. We welcome volunteers who want to contribute their time, skills, and support to our mission."
    }
  ];


  return (

    <section className="bg-white py-24">

      <div className="max-w-4xl mx-auto px-6">


        {/* Heading */}

        <div className="text-center mb-14">

          <p className="
            uppercase
            tracking-[5px]
            text-sm
            text-[#66785F]
            font-semibold
            mb-4
          ">
            Frequently Asked Questions
          </p>


          <h2 className="
            text-4xl
            md:text-5xl
            font-semibold
            text-[#2E332B]
          ">
            Common Questions
            <br />
            About Donations
          </h2>

        </div>



        {/* Accordion */}

        <div className="space-y-4">


          {questions.map((item, index) => (

            <div
              key={index}
              className="
                border
                border-[#DCCFC0]
                rounded-2xl
                overflow-hidden
                bg-[#FDF6ED]
              "
            >


              {/* Question */}

              <button
                onClick={() =>
                  setActiveIndex(
                    activeIndex === index ? null : index
                  )
                }
                className="
                  w-full
                  flex
                  justify-between
                  items-center
                  px-6
                  py-5
                  text-left
                "
              >

                <span className="
                  text-lg
                  font-semibold
                  text-[#2E332B]
                ">
                  {item.question}
                </span>


                <span
                  className={`
                    text-2xl
                    text-[#66785F]
                    transition-transform
                    duration-300
                    ${
                      activeIndex === index
                        ? "rotate-45"
                        : ""
                    }
                  `}
                >
                  +
                </span>


              </button>




              {/* Answer */}

              <div
                className={`
                  grid
                  transition-all
                  duration-300
                  ${
                    activeIndex === index
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }
                `}
              >

                <div className="overflow-hidden">

                  <p className="
                    px-6
                    pb-6
                    text-gray-600
                    leading-relaxed
                  ">
                    {item.answer}
                  </p>

                </div>

              </div>


            </div>

          ))}


        </div>


      </div>


    </section>

  );

};


export default FAQ;