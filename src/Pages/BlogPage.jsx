import { useState } from "react";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogPage() {
  const [expanded, setExpanded] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "How to Grow Your Wholesale Business",
      desc: "Learn proven strategies to scale your wholesale shop efficiently.",
      full: "Learn proven strategies to scale your wholesale shop efficiently. Start with building strong supplier networks, adopting digital tools, and leveraging eB2B platforms to expand your reach. Consistency and customer service are key.",
      date: "Sep 4, 2025",
      author: "Admin",
      color: "bg-green-50",
    },
    {
      id: 2,
      title: "Why B2B Platforms Are the Future",
      desc: "Discover how eB2B is transforming sourcing and supply chain.",
      full: "Discover how eB2B is transforming sourcing and supply chain by offering transparency, better pricing, and faster communication. Businesses save time and money while connecting with verified suppliers globally.",
      date: "Aug 28, 2025",
      author: "John Doe",
      color: "bg-green-50",
    },
    {
      id: 3,
      title: "Top 10 Products to Resell in 2025",
      desc: "Check out trending products that businesses are stocking up on.",
      full: "Check out trending products that businesses are stocking up on, including electronics, eco-friendly goods, and fashion essentials. Demand is rising, and wholesalers can benefit from stocking up early.",
      date: "Aug 15, 2025",
      author: "Sarah Lee",
      color: "bg-green-50",
    },
    {
      id: 4,
      title: "Managing Inventory Like a Pro",
      desc: "Tips to optimize stock levels and avoid overbuying.",
      full: "Managing inventory effectively is crucial for wholesale success. Use forecasting tools, set reorder points, and track fast-moving products. Avoid tying up too much capital in slow-moving stock.",
      date: "Aug 5, 2025",
      author: "Admin",
      color: "bg-green-50",
    },
    {
      id: 5,
      title: "Wholesale Pricing Secrets",
      desc: "A guide to understanding how wholesale pricing works.",
      full: "Wholesale pricing involves understanding bulk discounts, supplier negotiations, and logistics costs. Knowing the margin structure helps wholesalers stay competitive while maintaining profitability.",
      date: "Jul 20, 2025",
      author: "James Bond",
      color: "bg-green-50",
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const expandVariants = {
    collapsed: { height: 60, opacity: 1 },
    expanded: { height: "auto", opacity: 1 },
  };

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-4">Our Blog</h2>
      <p className="text-center text-gray-600 mb-12">
        Stay updated with the latest tips, insights, and news for wholesale
        businesses.
      </p>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map((blog, idx) => (
          <motion.div
            key={blog.id}
            className={`${blog.color} rounded-2xl shadow-md p-8 cursor-pointer`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            }}
          >
            {/* Blog Info */}
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <FaCalendarAlt /> {blog.date} • <FaUser /> {blog.author}
            </p>

            <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>

            {/* Expandable Description */}
            <AnimatePresence initial={false}>
              <motion.p
                key={expanded === blog.id ? "full" : "short"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 text-sm mt-2 overflow-hidden"
              >
                {expanded === blog.id ? blog.full : blog.desc}
              </motion.p>
            </AnimatePresence>

            <button
              onClick={() => setExpanded(expanded === blog.id ? null : blog.id)}
              className="mt-4 text-[#eb5e28] font-medium flex items-center gap-2 hover:underline"
            >
              {expanded === blog.id ? "Show Less" : "Read More"}{" "}
              <FaArrowRight />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
