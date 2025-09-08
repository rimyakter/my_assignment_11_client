import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const token = user?.accessToken;
  //   //intercept request
  //   const token = localStorage.getItem("token");
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  //intercept responses
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 401 || err.status === 403) {
        logOut()
          .then(() =>
            console.log(`You are Logged Out with" ${err.status} "Login again!`)
          )
          .catch((err) => console.log(err));
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
