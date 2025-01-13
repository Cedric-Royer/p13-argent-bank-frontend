import React, { useEffect } from "react";
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import Hero from "./Hero";
import Features from "./Features";

const Home = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); 

  useEffect(() => {
    if (token) {
      navigate("/profile"); 
    }
  }, [token, navigate]);

  return (
    <>
      <Hero />
      <Features />
    </>
  );
};

export default Home;
