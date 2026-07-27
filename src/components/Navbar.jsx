import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/Banner.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Campaigns", path: "/campaigns" },
    { name: "Donate", path: "/donate" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#7A866E] shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-2 lg:px-10 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            className="h-15 w-15 rounded-full"
            src={logo}
            alt="HopeBridge Logo"
          />

          <h1 className="text-3xl font-bold text-[#F5F1E8] ml-2">
            Hope<span className="text-[#DCCFC0]">Bridge</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-[#DCCFC0] text-[#3A4035]"
                      : "text-[#F5F1E8] hover:bg-[#DCCFC0] hover:text-[#3A4035]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Donate Button */}
        <Link
          to="/donate"
          className="hidden md:block bg-[#DCCFC0] text-[#3A4035] px-10 py-3 rounded-full font-semibold transition duration-300 hover:bg-[#F5F1E8]"
        >
          Donate
        </Link>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#F5F1E8] text-3xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#3A4035] border-t border-[#DCCFC0]">
          <ul className="flex flex-col gap-2 px-6 py-4">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 transition duration-300 ${
                      isActive
                        ? "bg-[#DCCFC0] text-[#3A4035]"
                        : "text-[#F5F1E8] hover:bg-[#DCCFC0] hover:text-[#3A4035]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            <Link
              to="/donate"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-[#DCCFC0] py-3 text-center font-semibold text-[#3A4035] transition duration-300 hover:bg-[#F5F1E8]"
            >
              Donate
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}