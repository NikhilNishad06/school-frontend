import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Teacher from "./components/Teacher";
import Vechile from "./components/Vechile";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


export default function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure content is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

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
