import React from "react";
import SwiperSlider from "./Home/swiperSlider";
import CategoryList from "./ProductCategory/CategoryList";
import WhyChooseUs from "./WhyChooseUs";
import BlogPage from "./BlogPage";

const Home = () => {
  return (
    <div>
      <div>
        <SwiperSlider></SwiperSlider>
      </div>
      <div>
        <CategoryList></CategoryList>
      </div>
      <div>
        <WhyChooseUs></WhyChooseUs>
      </div>
      <div>
        <BlogPage></BlogPage>
      </div>
    </div>
  );
};

export default Home;
