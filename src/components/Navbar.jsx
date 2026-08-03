import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/Banner.png";
import { getCurrentUser, logoutUser } from "../utils/auth";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Campaigns", path: "/campaigns" },
    { name: "Donate", path: "/donate" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Emergency Requests", path: "/emergency-requests" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#7A866E] shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-start px-2 lg:px-10 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="HopeBridge Logo"
            className="h-15 w-15 rounded-full"
          />

          <h1 className="text-3xl font-bold text-[#F5F1E8] ml-2">
            Hope
            <span className="text-[#DCCFC0]">
              Bridge
            </span>
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

          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="text-[#F5F1E8] font-medium px-3 py-2 rounded-lg hover:bg-[#DCCFC0] hover:text-[#3A4035]"
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  className="text-[#F5F1E8] font-medium px-3 py-2 rounded-lg hover:bg-[#DCCFC0] hover:text-[#3A4035]"
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="relative">

              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-[#F5F1E8]"
              >
                <div className="w-10 h-10 rounded-full bg-[#DCCFC0] text-[#3A4035] flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span>{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl overflow-hidden">
                                    {user.role === "admin" ? (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        <NotificationBell />

        {/* Donate Button */}

        <Link
          to="/donate"
          className="hidden md:block bg-[#DCCFC0] text-[#3A4035] px-15 py-3 mx-5 rounded-full font-semibold transition duration-300 hover:bg-[#F5F1E8]"
        >
          Donate
        </Link>

        {/* Mobile Menu Button */}

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

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-[#F5F1E8] px-4 py-3"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-[#F5F1E8] px-4 py-3"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                              {user.role === "admin" ? (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="text-[#F5F1E8] px-4 py-3"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="text-[#F5F1E8] px-4 py-3"
                  >
                    Profile
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-left text-red-300 px-4 py-3"
                >
                  Logout
                </button>
              </>
            )}

            {/* Mobile Donate Button */}

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
