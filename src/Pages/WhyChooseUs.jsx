import { motion } from "framer-motion";
import {
  FaTruck,
  FaTags,
  FaUndo,
  FaCreditCard,
  FaIndustry,
  FaChartLine,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Smarter Sourcing",
      desc: "Source products from lakhs of verified suppliers with ease.",
      icon: <FaChartLine size={30} />,
      color: "bg-white text-primary",
    },
    {
      title: "Wholesale Prices You’ll Love",
      desc: "Get exclusive wholesale rates across lakhs of products.",
      icon: <FaTags size={30} />,
      color: "bg-white text-primary",
    },
    {
      title: "1000+ Premium Brands",
      desc: "Stock the products your customers want from World's most trusted brands.",
      icon: <FaIndustry size={30} />,
      color: "bg-white text-primary",
    },
    {
      title: "Hassle-Free Returns",
      desc: "Easy, no-fuss returns on eligible items for peace of mind.",
      icon: <FaUndo size={30} />,
      color: "bg-white text-primary",
    },
    {
      title: "Fast & Reliable Delivery",
      desc: "From top cities across Bangladesh, directly to your shop & Home.",
      icon: <FaTruck size={30} />,
      color: "bg-white text-primary",
    },
    {
      title: "Business Credit",
      desc: "Grow your shop with flexible financing options.",
      icon: <FaCreditCard size={30} />,
      color: "bg-white text-primary",
    },
  ];

  // Framer Motion variants for animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12 w-full bg-yellow-100">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-2 text-gray-900">
        Why Choose Us
      </h2>
      <p className="text-center text-gray-600 mb-12 text-sm md:text-lg">
        Join millions of businesses growing with Bangladesh’s largest Wholesale
        platform
      </p>

      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            className={`rounded-2xl p-6 shadow-md flex items-start gap-4 ${f.color} cursor-pointer`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-3 bg-white rounded-full shadow-md">{f.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-sm mt-2">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
