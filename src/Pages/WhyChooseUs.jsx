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
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Wholesale Prices You’ll Love",
      desc: "Get exclusive wholesale rates across lakhs of products.",
      icon: <FaTags size={30} />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "1000+ Premium Brands",
      desc: "Stock the products your customers want from World's most trusted brands.",
      icon: <FaIndustry size={30} />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Hassle-Free Returns",
      desc: "Easy, no-fuss returns on eligible items for peace of mind.",
      icon: <FaUndo size={30} />,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Fast & Reliable Delivery",
      desc: "From top cities across Bangladesh, directly to your shop & Home.",
      icon: <FaTruck size={30} />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Business Credit",
      desc: "Grow your shop with flexible financing options.",
      icon: <FaCreditCard size={30} />,
      color: "bg-pink-100 text-pink-700",
    },
  ];

  // Framer Motion variants for animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 px-6 bg-yellow-50">
      <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us</h2>
      <p className="text-center text-gray-600 mb-12">
        Join millions of businesses growing with Bangladesh’s largest B2B
        platform
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
