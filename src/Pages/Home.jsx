import React from "react";
import SwiperSlider from "./Home/swiperSlider";
import CategoryList from "./ProductCategory/CategoryList";

const Home = () => {
  return (
    <div>
      <div>
        <SwiperSlider></SwiperSlider>
      </div>
      <div>
        <CategoryList></CategoryList>
      </div>
    </div>
  );
};

export default Home;
