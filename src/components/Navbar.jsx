import { useState } from "react";
import logo from '../assets/logo.png'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    "Home",
    "About",
    "Campaigns",
    "Donate",
    "Contact",
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#7A866E] shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-2 lg:px-10 py-4">

       <div className="flex">
        <img className="h-15 w-15 rounded-full " src={logo} alt="" />
        <a href="#" className="text-3xl font-bold text-[#F5F1E8] mt-3">Kind<span className="text-[#DCCFC0]">Ora</span></a>
       </div>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="
                text-[#F5F1E8]
                font-medium
                px-3 py-2
                rounded-lg
                transition-all
                duration-300
                hover:bg-[#DCCFC0]
                hover:text-[#3A4035]
                "
              >
                {item}
              </a>
            </li>
          ))}
        </ul>


        <a
          href="#"
          className="
          hidden md:block
          bg-[#DCCFC0]
          text-[#3A4035]
          px-7 py-3
          rounded-full
          font-semibold
          transition
          duration-300
          hover:bg-[#F5F1E8]
          "
        >
          Donate
        </a>


        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
          md:hidden
          text-[#F5F1E8]
          text-3xl
          "
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </nav>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#3A4035] border-t border-[#DCCFC0]">

          <ul className="flex flex-col gap-2 px-6 py-4">

            {navLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="
                  block
                  rounded-lg
                  px-4 py-3
                  text-[#F5F1E8]
                  transition
                  duration-300
                  hover:bg-[#DCCFC0]
                  hover:text-[#3A4035]
                  "
                >
                  {item}
                </a>
              </li>
            ))}


            <a
              href="#"
              className="
              mt-2
              rounded-full
              bg-[#DCCFC0]
              py-3
              text-center
              font-semibold
              text-[#3A4035]
              transition
              duration-300
              hover:bg-[#F5F1E8]
              "
            >
              Donate
            </a>

          </ul>

        </div>
      )}

    </header>
  );
}