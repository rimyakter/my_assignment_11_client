import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import loginImg from "../assets/user.png";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa"; // Added cart icon
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import NavLogo from "./NavLogo";

const Navbar = () => {
  const adminEmail = "asa@gmail.com";
  const [menuOpen, setMenuOpen] = useState(false);
  const [success, setSuccess] = useState(null);

  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setSuccess(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Successfully Logged Out",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  return (
    <div
      className="nav header text-gray-700 h-18 text-sm font-semibold bg-white shadow-md w-full sticky top-0 z-50"
      data-aos="fade-down"
    >
      <div className="w-11/12 mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLogo></NavLogo>

        {/* Desktop Nav */}
        <div
          className="hidden md:flex space-x-6 text-sm nav"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <NavLink
            to="/"
            className="hover:text-primary transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/aboutUs"
            className="hover:text-primary transition-colors duration-300"
          >
            About
          </NavLink>
          <NavLink
            to="/categories"
            className="hover:text-primary transition-colors duration-300"
          >
            Categories
          </NavLink>
          <NavLink
            to="/all-products"
            className="hover:text-primary transition-colors duration-300"
          >
            Shop
          </NavLink>

          {user && (
            <NavLink
              to={`/history/${user.email}`}
              className="hover:text-primary transition-colors duration-300"
            >
              History
            </NavLink>
          )}
          {user && user.email === adminEmail && (
            <NavLink
              to="/dashboard"
              className="hover:text-primary transition-colors duration-300"
            >
              Dashboard
            </NavLink>
          )}

          {/* Cart Icon instead of text */}
          {user && (
            <NavLink
              to={`/cart/${user.email}`}
              className="hover:text-primary  transition-colors duration-300 flex items-center"
            >
              <FaShoppingCart size={18} />
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden" data-aos="fade-left" data-aos-delay="300">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Right-side login/user (Desktop Only) */}
        <div
          className="hidden md:flex space-x-4 items-center"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative group">
              <img
                className="w-10 h-10 rounded-full border-2 border-primary"
                src={user ? user?.photoURL : loginImg}
                alt="User"
              />
              {user && (
                <div className="absolute top-full text-xs transform px-2 py-0.5 text-black bg-base-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {user.displayName}
                </div>
              )}
            </div>
          </div>

          {user ? (
            <>
              <div className="flex flex-col items-center">
                <p className="text-sm">Welcome!</p>
                <p className="text-xs">{user.displayName}</p>
              </div>
              <button
                onClick={handleLogOut}
                className="btn btn-sm bg-white text-black shadow-none hover:bg-primary hover:text-white transition-colors duration-400"
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <div className="flex space-x-1">
                <Link
                  to="/login"
                  className="btn btn-sm bg-white text-black shadow-none hover:text-primary transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm bg-white text-black shadow-none hover:text-primary transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-[#023047] text-white px-6 py-2 space-y-3"
          data-aos="fade-in"
          data-aos-duration="500"
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-primary transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/aboutUs"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-primary transition-colors duration-300"
          >
            About
          </NavLink>
          <NavLink
            to="/categories"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-primary transition-colors duration-300"
          >
            Categories
          </NavLink>
          <NavLink
            to="/all-products"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-primary transition-colors duration-300"
          >
            Shop
          </NavLink>

          {user && (
            <NavLink
              to={`/history/${user.email}`}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-primary transition-colors duration-300"
            >
              History
            </NavLink>
          )}
          {user && user.email === adminEmail && (
            <NavLink
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-primary transition-colors duration-300"
            >
              Dashboard
            </NavLink>
          )}
          {/* Mobile cart icon */}
          {user && (
            <NavLink
              to={`/cart/${user.email}`}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-primary transition-colors duration-300 flex items-center space-x-2"
            >
              <FaShoppingCart size={18} />
            </NavLink>
          )}

          <div className="pt-4 border-t border-base-300">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <img
                    className="w-10 h-10 rounded-full border border-base-300"
                    src={user?.photoURL || loginImg}
                    alt="User"
                  />
                  <div>
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                    setMenuOpen(false);
                  }}
                  className="btn btn-sm mt-3 bg-white text-black shadow-none w-full hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-sm bg-white text-black shadow-none w-full hover:text-primary transition-colors duration-300"
                >
                  Login
                </Link>
                <div className="mt-2">
                  <Link
                    to="/register"
                    className="btn btn-sm bg-white text-black shadow-none w-full hover:text-primary transition-colors duration-300"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
