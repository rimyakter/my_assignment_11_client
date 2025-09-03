import React, { useContext } from "react";
import SocialLogin from "./SocialLogin";
import lottieLogin from "../assets/Lottie/login.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const { googleLogin, signInUser } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    //Sign-In or Login user using Firebase Auth
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You Logged In  Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        //navigate user after use private route
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed! Try Again",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  ///Google Login or Google Sign-In

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        axios.post("http://localhost:3000/users", saveUser).then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Google Login Successful",
            showConfirmButton: false,
            timer: 1000,
          });
          //navigate user after use private route
          navigate(from);
        });
      })
      .catch(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Google Login Failed! Try Again!",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-right lg:text-left">
          <Lottie
            style={{ width: "300px" }}
            animationData={lottieLogin}
            loop={true}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-center text-2xl my-3 font-bold">Login Now</h1>
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
                <p className="text-xs ">
                  Don't Have An Account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-700 font-bold text-sm"
                  >
                    Register
                  </Link>
                </p>
              </fieldset>
            </form>
            <div onClick={handleGoogleLogin}>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
