import React from "react";
import SwiperSlider from "./Home/swiperSlider";
import CategoryList from "./ProductCategory/CategoryList";
import WhyChooseUs from "./WhyChooseUs";
import BlogPage from "./BlogPage";
import { Helmet } from "@dr.pogodin/react-helmet";
import TrustedPartners from "./Home/TrustedPartners";
import Testimonials from "./Home/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>B2B Wholesale || Home</title>
      </Helmet>
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
      <div>
        <TrustedPartners></TrustedPartners>
      </div>
      <div>
        <Testimonials></Testimonials>
      </div>
    </div>
  );
};

export default Home;
