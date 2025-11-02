import React from "react";
import CategoryList from "./ProductCategory/CategoryList";
import WhyChooseUs from "./WhyChooseUs";
import BlogPage from "./BlogPage";
import { Helmet } from "@dr.pogodin/react-helmet";
import TrustedPartners from "./Home/TrustedPartners";
import Testimonials from "./Home/Testimonials";
import HeroSection from "./Home/HeroSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Wholesale Avenue || Home</title>
      </Helmet>
      <div className="bg-white ">
        <HeroSection></HeroSection>
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
