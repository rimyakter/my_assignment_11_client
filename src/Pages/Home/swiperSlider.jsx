import React from "react";
import slider1 from "../../assets/swiper/slider1.jpg";
import slider2 from "../../assets/swiper/slider2.jpg";
import slider3 from "../../assets/swiper/slider3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const slides = [
  {
    image: slider1,
    title: "Welcome to Wholesale  Avenue",
    subtitle: "We have a special offer for our new customer in first purchase",
    buttonText: "Buy Now",
    buttonLink: "/categories",
  },
  {
    image: slider2,
    title: "Fully Trusted & Secure",
    subtitle:
      "We search for good products and provide good services through years",
    buttonText: "Explore More",
    buttonLink: "/all-products",
  },
  {
    image: slider3,
    title: "Sale! Sale! Sale!",
    subtitle: "We have a lot of different products on sale every weekend",
    buttonText: "See More",
    buttonLink: "/add-product",
  },
];

const SwiperSlider = () => {
  return (
    <div className="relative w-11/12 mx-auto my-4">
      <Swiper
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-md"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1500 }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Slide Image */}
              <img
                src={slide.image}
                alt={`slide-${index + 1}`}
                className="h-full w-full object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center text-white px-6 sm:px-12 md:px-20">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4">
                  {slide.title}
                </h2>

                <p className="text-sm sm:text-lg md:text-xl mb-6 max-w-2xl">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.buttonLink}
                  className="bg-primary hover:bg-primary transition px-6 py-2 mb-3 text-white rounded-lg font-medium text-sm sm:text-base"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
