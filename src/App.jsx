import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Education from "./components/Education";

function App() {
  const allowRef = useRef(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Prevent user-initiated scrolling (wheel / touch / keyboard) unless allowRef.current === true
    const prevent = (e) => {
      if (!allowRef.current) {
        e.preventDefault();
        e.stopImmediatePropagation?.();
        return false;
      }
    };

    const keyHandler = (e) => {
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      if (!allowRef.current && keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("keydown", keyHandler,  { passive: false });

    // Expose a programmatic scroll function that temporarily allows scrolling
    window.programmaticScrollTo = (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      allowRef.current = true;
      el.scrollIntoView({ behavior: "smooth" });
      // Turn off allowance after animatio    n (adjust timeout if needed)
      setTimeout(() => {
        allowRef.current = false;
      }, 900);
    };

    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown", keyHandler);
      try {
        delete window.programmaticScrollTo;
      } catch (e) {}
    };
  }, []);

  return (
    <div className="site-wrap">
      <Header />
      <div style={{ marginBottom: "60px" }} />
      <Hero />
      <div style={{ marginBottom: "60px" }} />
      <About />
      <div style={{ marginBottom: "60px" }} />
      <Skills />
      <div style={{ marginBottom: "60px" }} />
      <Projects />
      <div style={{ marginBottom: "60px" }} />
      <Contact />
      <div style={{ marginBottom: "60px" }} />
      <Education />
      <div style={{ marginBottom: "60px" }} />
      <Footer />
    </div>
  );
}

export default App;
