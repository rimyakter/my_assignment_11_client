import React from "react";
import {
  FaShippingFast,
  FaBoxes,
  FaHandshake,
  FaQuoteLeft,
  FaQuoteRight,
  FaBullseye,
} from "react-icons/fa";
import { Helmet } from "@dr.pogodin/react-helmet";

const AboutUs = () => {
  return (
    <div className="w-11/12 mx-auto py-16">
      <Helmet>
        <title>Wholesale Avenue || About Us</title>
      </Helmet>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          About <span className="text-primary">Wholesale Avenue</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-lg">
          Wholesale Avenue is your trusted B2B marketplace for high-quality
          products at competitive prices. Our mission is to connect businesses
          with suppliers and help you grow your business efficiently.
        </p>
      </div>

      {/* Features / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <FaShippingFast className="text-primary text-5xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Fast Delivery
          </h2>
          <p className="text-gray-600 text-sm">
            We ensure your orders are delivered quickly and safely with our
            reliable shipping partners.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <FaBoxes className="text-primary text-5xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Wide Selection
          </h2>
          <p className="text-gray-600 text-sm">
            Explore thousands of products across multiple categories to meet all
            your business needs.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <FaHandshake className="text-primary text-5xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Trusted Partners
          </h2>
          <p className="text-gray-600 text-sm">
            We partner with verified suppliers to ensure quality and
            trustworthiness in every transaction.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="mt-16 max-w-4xl mx-auto text-center relative">
        <FaBullseye className="text-primary text-6xl mx-auto mb-4" />
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Mission
        </h2>

        {/* Decorative Quote */}
        <div className="relative bg-white shadow-md rounded-lg p-8 mt-6">
          <FaQuoteLeft className="absolute top-4 left-4 text-primary text-3xl opacity-40" />
          <FaQuoteRight className="absolute bottom-4 right-4 text-primary text-3xl opacity-40" />
          <p className="text-gray-600 text-sm md:text-lg italic leading-relaxed">
            “At{" "}
            <span className="text-primary font-semibold">Wholesale Avenue</span>
            , our mission is to simplify wholesale buying and selling. We
            empower small and medium businesses by providing access to
            affordable, high-quality products and seamless transactions. Our
            platform bridges the gap between businesses and suppliers, enabling
            growth and success for all our partners.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
