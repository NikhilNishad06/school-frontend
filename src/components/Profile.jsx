import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Teacher from "./Teacher";
import Vechile from "./Vechile";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Profile() {

  return (
<>
     <Navbar />
      <Home />
      <About />
      <Teacher />
      <Vechile />
      <Contact />
      <Footer /> 
</>

  );
}
