import React, { useContext } from "react";
import lottieRegister from "../assets/Lottie/register.json";
import Lottie from "lottie-react";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const { createUser, user, setUser, updateUser } = useContext(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const photo = form.photo.value;
    const name = form.name.value;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters, include an uppercase and a lowercase letter.",
      });
      return;
    }

    //Create user or register using Firebase-Auth

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({
          displayName: name,
          photoURL: photo || "https://i.ibb.co/placeholder.png",
        }).finally(() => setUser(user));

        const userProfile = {
          email,
          ...restFormData,
          creationTime: user?.metadata?.creationTime,
          lastSignInTime: user?.metadata?.lastSignInTime,
        };

        // Save Profile Info in database
        axios.post("http://localhost:3000/users", userProfile).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Account is created",
              showConfirmButton: false,
              timer: 1000,
            });
            navigate(from);
          }
        });
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

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-right lg:text-left">
          <Lottie
            style={{ width: "300px" }}
            animationData={lottieRegister}
            loop={true}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-center text-2xl my-3 font-bold">
              Register Now
            </h1>
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Your Name"
                />
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Your Photo Url"
                />
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
                <button className="btn btn-neutral mt-4">Register</button>
                <p className="text-xs ">
                  Already Have An Account?{" "}
                  <Link to="/login" className="text-blue-700 font-bold text-sm">
                    Login
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
