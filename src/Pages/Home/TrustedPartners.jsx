import React from "react";
import { FiTruck, FiBox, FiTag, FiGlobe, FiShoppingCart } from "react-icons/fi";

const TrustedPartners = () => {
  const partners = [
    { id: 1, name: "Global Trade", icon: <FiGlobe /> },
    { id: 2, name: "FastShip", icon: <FiTruck /> },
    { id: 3, name: "MegaCart", icon: <FiShoppingCart /> },
    { id: 4, name: "BulkBox", icon: <FiBox /> },
    { id: 5, name: "DealHub", icon: <FiTag /> },
    { id: 6, name: "ProSupply", icon: <FiBox /> },
    { id: 7, name: "TradeMax", icon: <FiGlobe /> },
  ];

  return (
    <section className="py-14 bg-gray-50 overflow-hidden">
      {/* Title */}
      <h2 className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-2 flex justify-center items-center gap-3">
        <FiGlobe className="text-primary text-3xl" />
        Our Trusted Partners
      </h2>

      <p className="text-gray-600 text-center text-sm md:text-lg mb-12">
        Empowering global trade through trusted partnerships
      </p>

      {/* Marquee container */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 animate-marquee">
          {partners.concat(partners).map((p, i) => (
            <div
              key={i}
              className="min-w-[200px] flex flex-col items-center justify-center border border-gray-200 bg-white  shadow-sm rounded-xl p-6 hover:shadow-lg transition-transform duration-300 hover:scale-95"
            >
              <div className="text-5xl text-primary mb-3">{p.icon}</div>
              <h3 className="text-lg font-semibold text-gray-600">{p.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: calc(200px * ${partners.length * 2});
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedPartners;
