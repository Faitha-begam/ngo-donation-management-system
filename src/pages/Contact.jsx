import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How can I make a donation?",
      answer:
        "You can donate securely through our Donate page using the available payment options. Every contribution directly supports our campaigns.",
    },
    {
      question: "Can I volunteer without donating?",
      answer:
        "Absolutely! Volunteers are an essential part of our organization. You can join through our Volunteer page.",
    },
    {
      question: "Is my donation tax deductible?",
      answer:
        "Depending on your country's regulations and our registration status, your donation may qualify for tax benefits.",
    },
    {
      question: "How do I know where my donation goes?",
      answer:
        "We maintain transparency by regularly updating campaign progress and impact reports on our website.",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 98765 43210",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@hopebridge.org",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Hope Street, Chennai",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Fri | 9:00 AM - 6:00 PM",
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.subject.trim())
      newErrors.subject = "Subject is required.";

    if (!formData.message.trim())
      newErrors.message = "Message is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const messages =
      JSON.parse(localStorage.getItem("contactMessages")) || [];

    const newMessage = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);

    localStorage.setItem(
      "contactMessages",
      JSON.stringify(messages)
    );

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-[#F8F7F2]">

      {/* ================= HERO ================= */}

      <section className="bg-[#7A866E] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-white/15 px-5 py-2 rounded-full mb-6">
            <MessageCircle size={18} />
            <span>We're Here To Help</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            Contact HopeBridge
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-8">
            Whether you have questions about donations,
            volunteering, partnerships, or simply want to
            connect with us, we'd love to hear from you.
            Together we can create lasting change.
          </p>

        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {contactInfo.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300"
              >

                <div className="mx-auto w-16 h-16 rounded-full bg-[#7A866E]/10 flex items-center justify-center mb-5">
                  <Icon
                    size={28}
                    className="text-[#7A866E]"
                  />
                </div>

                <h3 className="font-bold text-xl text-[#374031]">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  {item.value}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* ================= CONTACT FORM ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid lg:grid-cols-2 gap-14">

          {/* Left */}

          <div>

            <span className="text-[#7A866E] font-semibold uppercase tracking-widest">
              Get In Touch
            </span>

            <h2 className="text-4xl font-bold mt-4 text-[#374031]">
              We'd Love To Hear From You
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Our team is always available to answer your
              questions and help you become part of our
              mission. Send us a message and we'll get back
              to you as soon as possible.
            </p>

            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900"
              alt="Contact"
              className="rounded-3xl mt-10 shadow-xl h-[400px] w-full object-cover"
            />

          </div>

          {/* Right */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h3 className="text-3xl font-bold text-[#374031]">
              Send a Message
            </h3>

            <p className="text-gray-500 mt-3">
              Fill out the form below and we'll respond soon.
            </p>

            {submitted && (
              <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl">
                ✅ Thank you! Your message has been received.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-8"
            >

              {/* Name */}

              <div>
                <label className="font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A866E] outline-none"
                />

                {errors.name && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.name}
                  </p>
                )}
              </div>

                            {/* Email */}

              <div>
                <label className="font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full mt-2 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A866E] outline-none"
                />

                {errors.email && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}

              <div>
                <label className="font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Donation, Partnership, Volunteer..."
                  className="w-full mt-2 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A866E] outline-none"
                />

                {errors.subject && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}

              <div>
                <label className="font-medium">
                  Message
                </label>

                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full mt-2 border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#7A866E] outline-none"
                />

                {errors.message && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="w-full bg-[#7A866E] hover:bg-[#67725C] transition duration-300 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-14">

            <span className="uppercase tracking-widest text-[#7A866E] font-semibold">
              FAQs
            </span>

            <h2 className="text-4xl font-bold mt-4 text-[#374031]">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">
              Find quick answers to some of the most common
              questions about donations, volunteering and our
              organization.
            </p>

          </div>

          <div className="space-y-5">

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-2xl overflow-hidden shadow-sm"
              >

                <button
                  onClick={() =>
                    setOpenFAQ(
                      openFAQ === index ? null : index
                    )
                  }
                  className="w-full flex justify-between items-center p-6 bg-[#F9F9F6] hover:bg-[#EEF2EA] transition"
                >
                  <span className="font-semibold text-left text-lg text-[#374031]">
                    {faq.question}
                  </span>

                  {openFAQ === index ? (
                    <ChevronUp className="text-[#7A866E]" />
                  ) : (
                    <ChevronDown className="text-[#7A866E]" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-8">
                    {faq.answer}
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="bg-[#7A866E] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Together We Can Make A Difference
          </h2>

          <p className="mt-6 text-lg text-gray-200 leading-8">
            Every donation, every volunteer, and every
            conversation helps us bring hope to communities in
            need. Thank you for supporting HopeBridge.
          </p>

        </div>
      </section>

    </div>
  );
};

export default Contact;