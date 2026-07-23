import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#7A866E] text-[#F5F1E8]">
      <div className="sticky max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* NGO Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            HopeHands NGO
          </h2>

          <p className="text-sm leading-6 text-[#E8E3D5]">
            Together we can create a better tomorrow.
            Your support helps us provide education,
            food, healthcare, and opportunities for
            communities in need.
          </p>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              Home
            </li>

            <li className="hover:text-white transition cursor-pointer">
              About
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Campaigns
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Donate
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Contact
            </li>
          </ul>
        </div>


        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Contact Us
          </h3>

          <ul className="space-y-3 text-sm text-[#E8E3D5]">
            <li>📍 Chennai, India</li>
            <li>✉️ contact@hopehands.org</li>
            <li>☎️ +91 98765 43210</li>
          </ul>
        </div>


        {/* Donation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Support Us
          </h3>

          <p className="text-sm text-[#E8E3D5] mb-5">
            Your small contribution can create a big impact.
          </p>

          <button
            className="
              bg-[#D6C7A1]
              text-[#3F4935]
              px-6 py-2
              rounded-full
              font-semibold
              hover:bg-[#E5D8B8]
              transition
              duration-300
            "
          >
            Donate Now
          </button>
        </div>

      </div>


      {/* Copyright */}
      <div className="
        border-t border-[#9BA58A]
        text-center
        py-5
        text-sm
        text-[#E8E3D5]
      ">
        © {new Date().getFullYear()} HopeHands NGO. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;