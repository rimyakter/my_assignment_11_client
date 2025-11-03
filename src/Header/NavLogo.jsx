import React from "react";
import { Link } from "react-router";
import icon from "../assets/swiper/icon.png";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
      {/* Logo Image */}
      <img
        src={icon}
        alt="Wholesale Avenue Icon"
        className="w-10 md:w-12 h-13 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
      />

      {/* Logo Text */}
      <span className="text-lg md:text-2xl -ml-7 font-extrabold text-primary group-hover:text-primary/90 transition-colors duration-300">
        <span className="inline-block tracking-[0.3em]"></span>
        <span className="text-secondary">Wholesale Avenue</span>
      </span>
    </Link>
  );
};

export default NavLogo;
