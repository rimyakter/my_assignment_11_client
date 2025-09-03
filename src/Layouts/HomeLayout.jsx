import React from "react";
import Navbar from "../Header/Navbar";
import { Outlet } from "react-router";
import Footer from "../Pages/Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
