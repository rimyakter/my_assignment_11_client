import React from "react";
import Navbar from "../Header/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Pages/Footer/Footer";
import Loading from "../Pages/Home/Loading";

const HomeLayout = () => {
  const { state } = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
      {state == "loading" ? <Loading></Loading> : <Outlet></Outlet>}

      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
