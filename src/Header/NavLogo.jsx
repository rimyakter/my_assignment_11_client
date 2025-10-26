import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router";

const NavLogo = () => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <FiShoppingBag className="text-2xl text-primary" />
      <Link to="/" className="text-xl font-bold text-primary">
        Wholesale Avenue
      </Link>
    </div>
  );
};

export default NavLogo;
