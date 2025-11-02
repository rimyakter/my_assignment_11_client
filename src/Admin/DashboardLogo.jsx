import React from "react";
import { Link } from "react-router";
import icon from "../assets/swiper/icon.png";

const DashboardLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
      {/* Logo Image */}
      <img
        src={icon}
        alt="Wholesale Avenue Icon"
        className="w-8 h-12 md:w-10 md:h-12 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
      />

      {/* Logo Text */}
      <span className="text-xl -ml-8 font-bold text-primary group-hover:text-primary/90 transition-colors duration-300">
        <span className="inline-block tracking-[0.3em]">W</span>
        <span className="text-secondary">holesale Avenue</span>
      </span>
    </Link>
  );
};

export default DashboardLogo;
