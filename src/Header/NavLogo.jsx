import React from "react";
import { FiShoppingBag } from "react-icons/fi";

const NavLogo = () => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <FiShoppingBag className="text-2xl text-white" />
      <span className="text-xl font-bold text-white">Wholesale Avenue</span>
    </div>
  );
};

export default NavLogo;
