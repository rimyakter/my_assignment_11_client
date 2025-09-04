import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import loginImg from "../assets/user.png";

import { FaBars, FaTimes } from "react-icons/fa";

import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
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
      className="nav header border-b border-white text-white bg-[#023047] shadow-md w-full sticky top-0 z-50"
      data-aos="fade-down"
    >
      <div className="w-11/12 mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <h2
          className="text-2xl font-bold"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          B2B Wholesale
        </h2>

        {/* Desktop Nav */}
        <div
          className="hidden md:flex space-x-6 text-sm nav"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/all-products">AllProducts</NavLink>
          <NavLink to="/add-product">AddProduct</NavLink>
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
                className="w-10 h-10 rounded-full border-2 border-base-300"
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
                className="btn btn-sm bg-white text-black shadow-none"
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <div className="flex space-x-1">
                <Link
                  to="/login"
                  className="btn btn-sm bg-white text-black shadow-none"
                >
                  Login
                </Link>{" "}
                <Link
                  to="/register"
                  className="btn btn-sm bg-white text-black shadow-none"
                >
                  Register
                </Link>{" "}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-[#023047] text-white px-6 py-4 space-y-3"
          data-aos="fade-in"
          data-aos-duration="500"
        >
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </NavLink>
          <NavLink
            to="/categories"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Categories
          </NavLink>

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
                  className="btn btn-sm mt-3 bg-white text-black shadow-none w-full"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-sm bg-white text-black shadow-none w-full"
                >
                  Login
                </Link>
                <div className="mt-2">
                  <Link
                    to="/register"
                    className="btn btn-sm bg-white text-black shadow-none w-full"
                  >
                    Register
                  </Link>{" "}
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
