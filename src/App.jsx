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

    // --- ✅ मोबाइल चेक ---
    // 1024px को हम टैबलेट तक का ब्रेकपॉइंट मान रहे हैं।
    // इससे कम चौड़ाई होने पर, हम सामान्य स्क्रॉलिंग होने देंगे।
    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      // --- मोबाइल लॉजिक ---
      // 1. हम स्क्रॉल-प्रिवेंट वाले लिस्टनर्स को नहीं जोड़ेंगे, ताकि स्क्रॉलिंग हो सके।
      
      // 2. हम Header में इस्तेमाल के लिए एक सामान्य स्क्रॉल फ़ंक्शन देंगे।
      window.programmaticScrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      };

      // 3. मोबाइल के लिए क्लीनअप
      return () => {
        try {
          delete window.programmaticScrollTo;
        } catch (e) {}
      };

    } else {
      // --- डेस्कटॉप लॉजिक (आपका मौजूदा कोड) ---
      
      // 1. स्क्रॉल को रोकने वाला फ़ंक्शन
      const prevent = (e) => {
        if (!allowRef.current) {
          e.preventDefault();
          e.stopImmediatePropagation?.();
          return false;
        }
      };

      // 2. कीबोर्ड स्क्रॉल को रोकने वाला फ़ंक्शन
      const keyHandler = (e) => {
        const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
        if (!allowRef.current && keys.includes(e.key)) {
          e.preventDefault();
        }
      };

      // 3. इवेंट लिस्टनर्स (सिर्फ डेस्कटॉप के लिए)
      window.addEventListener("wheel", prevent, { passive: false });
      // (हमने 'touchmove' हटा दिया है, क्योंकि डेस्कटॉप पर 'wheel' मुख्य है)
      window.addEventListener("keydown", keyHandler, { passive: false });

      // 4. डेस्कटॉप के लिए आपका कस्टम 'programmaticScrollTo' फ़ंक्शन
      window.programmaticScrollTo = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        allowRef.current = true;
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          allowRef.current = false;
        }, 900);
      };

      // 5. डेस्कटॉप के लिए क्लीनअप
      return () => {
        window.removeEventListener("wheel", prevent);
        window.removeEventListener("keydown", keyHandler);
        try {
          delete window.programmaticScrollTo;
        } catch (e) {}
      };
    }
  }, []); // खाली ऐरे का मतलब है कि यह सिर्फ एक बार चलेगा

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