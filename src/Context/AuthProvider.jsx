import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //create user or register
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Google Login or Google sign-In

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //Sign-In or login User

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //set observer to save current user info

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //Post request for JWT using user email
      //Api end-point : JWT (post method)
      if (currentUser?.email) {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            {
              email: currentUser?.email,
            },
            {
              withCredentials: true, //mandatory for store cookie in browser cookie
            }
          )
          .then((res) => {
            console.log(res.data);
            //for store token local storage method
            // localStorage.setItem("token", res.data.token);
          });
      } else {
        localStorage.removeItem("token");
      }

      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  //Update user method

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  //User Sign-Out method

  const logOut = () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    googleLogin,
    signInUser,
    logOut,
    updateUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
