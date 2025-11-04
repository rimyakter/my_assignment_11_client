import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import bag1 from "../../assets/swiper/bag1.png";
import bag4 from "../../assets/swiper/bag4.png";
import sale from "../../assets/swiper/sale.png";

const headlines = ["Shop. Save. Supply"];

const discounts = [
  "Sale!!! Sale!!! Sale!!!",
  "50% Off On Electronics!",
  "Buy 2 Get 1 Free On Fashion!",
  "Extra 20% Off For New Users!",
];

const HeroSection = () => {
  const [discountIndex, setDiscountIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiscountIndex((prev) => (prev + 1) % discounts.length);
    }, 10000); // change sentence every 7s (matches scroll duration)
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== Marquee Discount Bar ===== */}
      <div className="w-full pt-3  sm:py-3 overflow-hidden ">
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="5"
          className="flex items-center gap-4 text-primary font-semibold text-sm sm:text-xl tracking-wide"
        >
          <img
            src={sale}
            alt="Discount Icon"
            className="inline-block w-10 h-10 mr-2 align-middle"
          />
          {discounts[discountIndex]}
        </marquee>
      </div>

      {/* ===== Hero Section Content ===== */}
      <div className="relative w-11/12 mx-auto mb-6 overflow-hidden flex flex-col md:flex-row items-center justify-between py-5 md:py-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4"
          >
            {headlines[0]}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="text-gray-600 text-justify sm:text-center text-xs sm:text-xl max-w-xl leading-relaxed"
          >
            Discover unbeatable wholesale prices and premium quality products —
            all in one place!
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex text-xs sm:text-lg sm:flex-row gap-2 sm:gap-4 mt-6 justify-center md:justify-start"
          >
            <Link
              to="/categories"
              className="bg-primary hover:bg-primary/90 transition-all px-3 py-2 sm:px-8 sm:py-3 text-white rounded-lg font-semibold flex items-center justify-center shadow-md"
            >
              Buy Now <FaShoppingCart className="ml-2 text-lg" />
            </Link>

            <Link
              to="/all-products"
              className="border-2 border-primary text-primary hover:bg-gray-100 transition-all px-3 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold flex items-center justify-center shadow-md"
            >
              Explore More <FaArrowRight className="ml-2 text-lg" />
            </Link>
          </motion.div>
        </div>

        {/* Right Floating Bags */}
        <div className="flex-1 relative flex items-center justify-center mt-10 md:mt-0">
          <motion.img
            src={bag1}
            alt="Bag 1"
            className="w-40 sm:w-48 md:w-56 drop-shadow-2xl"
            animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />

          <motion.img
            src={bag4}
            alt="Bag 4"
            className="w-36 sm:w-44 md:w-52 absolute right-10 bottom-0 drop-shadow-2xl"
            animate={{ y: [0, 15, 0], rotate: [0, -3, 3, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          />

          {/* Glowing Background */}
          <motion.div
            className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"
            animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
