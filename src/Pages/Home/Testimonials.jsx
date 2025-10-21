import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const feedback = [
    {
      name: "Rahul Sharma",
      text: "Amazing platform for sourcing products in bulk! It made our procurement process seamless and efficient.",
    },
    {
      name: "Emma Wilson",
      text: "The best B2B service I’ve ever used. Excellent communication and high-quality suppliers!",
    },
    {
      name: "David Chen",
      text: "Fast delivery and reliable logistics. Our supply chain has never been smoother.",
    },
    {
      name: "Sophia Lee",
      text: "Beautiful interface and top-notch customer support. Highly recommended!",
    },
    {
      name: "Michael Brown",
      text: "Great selection of verified suppliers and consistent service quality. Will definitely return.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100 to-white">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-xl md:text-3xl font-bold my-6 text-center gap-3 flex items-center justify-center">
          <FaQuoteLeft className="text-primary" /> What our clients say
        </h2>
        <p className="text-gray-600 text-sm md:text-lg  ">
          Hear directly from businesses that trust us to simplify and scale
          their sourcing operations.
        </p>
      </div>

      {/* Swiper Section */}
      <div className="w-11/12 mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} custom-bullet"></span>`,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {feedback.map((f, i) => (
            <SwiperSlide key={i} className="flex">
              <div className="relative flex flex-col justify-between bg-white border border-gray-200 rounded-xl shadow-sm p-10 pt-20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Quote Icon */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border-4 border-orange-500 rounded-full p-4 shadow-md">
                  <FaQuoteRight className="text-orange-500 text-3xl" />
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 italic text-base leading-relaxed mt-5 mb-6 flex-grow">
                  “{f.text}”
                </p>

                {/* Author */}
                <h4 className="font-semibold text-gray-900 text-lg">
                  {f.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination {
          margin-top: 2rem !important;
          position: relative !important;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
          margin: 0 6px !important;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #f97316, #ea580c);
          transform: scale(1.25);
          box-shadow: 0 0 8px rgba(234, 88, 12, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
