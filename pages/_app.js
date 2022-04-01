import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import React, { useState } from "react";
import useAuth from "../components/AuthHook/AuthHook";
import Navbar from "../components/Navbar/navbar";

// creating context
export const AuthContext = React.createContext({
  auther: false,
  account: false,
});

function MyApp({ Component, pageProps }) {
  const { auther, account } = useAuth();

  return (
    <AuthContext.Provider value={{ auther, account }}>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
