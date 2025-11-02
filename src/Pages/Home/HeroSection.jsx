import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaShoppingCart, FaPercent, FaArrowRight } from "react-icons/fa";
import bag1 from "../../assets/swiper/bag1.png";
import bag2 from "../../assets/swiper/bag2.png";
import bag3 from "../../assets/swiper/bag3.png";
import bag4 from "../../assets/swiper/bag4.png";
import cart from "../../assets/swiper/cart.png";
import sale from "../../assets/swiper/sale.png";

const headlines = ["Shop. Save. Supply"];

const discounts = [
  "50% Off On Electronics!",
  "Buy 2 Get 1 Free On Fashion!",
  "Extra 20% Off For New Users!",
];

const HeroSection = () => {
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountIndex, setDiscountIndex] = useState(0);

  useEffect(() => {
    setShowDiscount(true);

    const interval = setInterval(() => {
      setDiscountIndex((prev) => (prev + 1) % discounts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-11/12 mx-auto mb-6 overflow-hidden flex flex-col md:flex-row items-center justify-between py-10">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left space-y-6">
        {/* Floating Discount Text with Dynamic Animated Border */}
        {showDiscount && (
          <motion.div
            key={discountIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              y: { repeat: Infinity, duration: 8, ease: "easeInOut" },
            }}
            className="relative inline-flex items-center justify-center p-[2px] rounded-xl mb-6 overflow-hidden"
          >
            {/* Dynamic Animated Border */}
            <motion.span
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  "conic-gradient(from 0deg, #ff007f, #ffbe0b, #00b4d8, #8338ec, #ff007f)",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "linear",
              }}
            ></motion.span>

            {/* Inner Content */}
            <div className="relative bg-white rounded-xl px-2 md:px-5 py-3 flex items-center gap-3 font-semibold text-primary text-lg sm:text-xl ">
              {/* Animated Bag */}
              <motion.img
                src={sale}
                alt="Discount Bag"
                className="w-8 sm:w-10 drop-shadow-md"
                animate={{ y: [0, -6, 0], rotate: [0, -5, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
              />

              {/* Discount Text */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="flex items-start md:items-center gap-0 md:gap-2 text-xl md:text-2xl"
              >
                <motion.span
                  key={discountIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="bg-gradient-to-r from-primary/70 to-primary/90 bg-clip-text text-transparent"
                >
                  {discounts[discountIndex]}
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4  "
        >
          {headlines[0]}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-gray-600 text-sm sm:text-xl max-w-xl leading-relaxed"
        >
          Discover unbeatable wholesale prices and premium quality products —
          all in one place!
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start"
        >
          <Link
            to="/categories"
            className="bg-primary hover:bg-primary/90 transition-all px-8 py-3 text-white rounded-lg font-semibold flex items-center justify-center shadow-md"
          >
            Buy Now <FaShoppingCart className="ml-2 text-lg" />
          </Link>

          <Link
            to="/all-products"
            className="border-2 border-primary text-primary hover:bg-gray-100 transition-all px-8 py-3 rounded-lg font-semibold flex items-center justify-center shadow-md"
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
  );
};

export default HeroSection;
