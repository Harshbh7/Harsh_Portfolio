import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const Header = () => {
  const sections = ["Home", "About", "Skills", "Projects", "Education", "Contact"];
  
  // स्टेट: एक्टिव सेक्शन हाइलाइटिंग के लिए
  const [activeSection, setActiveSection] = useState("home");
  
  // स्टेट: मोबाइल ड्रॉवर के लिए
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // स्टेट: स्क्रॉल-आधारित स्टाइलिंग के लिए
  const [scrolled, setScrolled] = useState(false);

  // रेस्पॉन्सिव डिज़ाइन हुक्स
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Ref: IntersectionObserver के लिए
  const sectionRefs = useRef({});

  // --- 1. इफ़ेक्ट: स्क्रॉल-आधारित स्टाइलिंग ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 2. इफ़ेक्ट: एक्टिव सेक्शन हाइलाइटिंग ---
  useEffect(() => {
    // ऑब्ज़र्वर के लिए विकल्प
    const observerOptions = {
      root: null, // व्यूपोर्ट के सापेक्ष
      rootMargin: "-30% 0px -70% 0px", // जब सेक्शन स्क्रीन के बीच 40% में हो तब ट्रिगर होता है
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // सभी सेक्शन्स को ऑब्ज़र्व करें
    sections.forEach((section) => {
      const id = section.toLowerCase();
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    // क्लीनअप
    return () => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [sections]);

  // --- 3. हैंडलर्स ---
  const handleNavClick = (id) => {
    // ✅ आपके App.jsx में मौजूद कस्टम स्क्रॉल फ़ंक्शन का उपयोग करें
    if (window.programmaticScrollTo) {
      window.programmaticScrollTo(id);
    } else {
      // फॉलबैक: अगर फ़ंक्शन मौजूद नहीं है
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    
    setActiveSection(id); // तुरंत फीडबैक के लिए मैन्युअल रूप से सेट करें
    if (isMobile) {
      setMobileOpen(false); // सलेक्शन पर ड्रॉवर बंद करें
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // --- 4. मोबाइल के लिए ड्रॉवर ---
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        background: "rgba(10, 25, 41, 0.9)", // डार्क, ग्लासी बैकग्राउंड
        backdropFilter: "blur(15px)",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ my: 2, color: "#61dafb", fontWeight: 700 }}>
        Menu
      </Typography>
      <List>
        {sections.map((section) => {
          const id = section.toLowerCase();
          const isActive = activeSection === id;
          return (
            <ListItem key={section} disablePadding>
              <ListItemButton
                sx={{
                  textAlign: "center",
                  background: isActive ? "rgba(97, 218, 251, 0.1)" : "transparent",
                  borderRight: isActive ? "4px solid #61dafb" : "none",
                  "&:hover": {
                    background: "rgba(97, 218, 251, 0.2)",
                  },
                }}
                onClick={() => handleNavClick(id)}
              >
                <ListItemText
                  primary={section}
                  primaryTypographyProps={{
                    color: isActive ? "#61dafb" : "#e0e0e0",
                    fontWeight: isActive ? 700 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  // --- 5. मुख्य रेंडर ---
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // === ग्लासमोर्फिज़्म इफ़ेक्ट यहाँ है ===
          background: scrolled
            ? "rgba(10, 25, 41, 0.85)" // स्क्रॉल पर ज़्यादा ओपेक
            : "rgba(10, 25, 41, 0.7)", // डिफ़ॉल्ट ट्रांसपेरेंसी
          backdropFilter: "blur(20px) saturate(180%)", // बैकग्राउंड ब्लर
          WebkitBackdropFilter: "blur(20px) saturate(180%)", // सफारी के लिए
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)", // कांच का किनारा
          // ==================================
          boxShadow: scrolled
            ? "0 8px 32px rgba(97, 218, 251, 0.25)" // स्क्रॉल पर बढ़ी हुई शैडो
            : "0 8px 25px rgba(97, 218, 251, 0.15)",
          transition: "all 0.4s ease",
          zIndex: 1200,
          overflow: "hidden",
          "&::before": {
            // आपका ओरिजिनल ग्रेडिएंट एनीमेशन
            content: '""',
            position: "absolute",
            top: 0,
            left: "-50%",
            width: "200%",
            height: "2px",
            background:
              "linear-gradient(90deg, rgba(97,218,251,0.8), rgba(124,92,255,0.8), rgba(97,218,251,0.8))",
            backgroundSize: "200% 100%",
            animation: "moveGradient 4s linear infinite",
          },
          "@keyframes moveGradient": {
            "0%": { backgroundPosition: "0% 50%" },
            "100%": { backgroundPosition: "200% 50%" },
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 } }}>
          
          {/* --- ✅ 1. लोगो (अपडेटेड) --- */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -2 }} // ✅ आकर्षक होवर इफ़ेक्ट
            style={{ cursor: "pointer" }}
            onClick={() => handleNavClick("home")}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                // ✅ रेस्पॉन्सिव फ़ॉन्ट साइज़
                fontSize: { xs: "1.6rem", sm: "1.5rem", md: "1.5rem" }, 
                letterSpacing: "1px",
                background: "linear-gradient(90deg, #61dafb, #7c5cff, #61dafb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "300%",
                animation: "shine 6s linear infinite",
                textShadow: "0 0 15px rgba(97, 218, 251, 0.4)",
                whiteSpace: "nowrap", 
                "@keyframes shine": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "100%": { backgroundPosition: "300% 50%" },
                },
              }}
            >
              {/* --- ✅ 2. रेस्पॉन्सिव टेक्स्ट --- */}
              <Box component="span" sx={{ display: { xs: "none", sm: "none", md: "inline" } }}>
                Harsh Sharma (HS)
              </Box>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline", md: "none" } }}>
                Harsh Sharma
              </Box>
              <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                HS
              </Box>
            </Typography>
          </motion.div>

          {/* नेविगेशन लिंक्स - डेस्कटॉप */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {sections.map((section, index) => {
              const id = section.toLowerCase();
              const isActive = activeSection === id;
              return (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Button
                    onClick={() => handleNavClick(id)}
                    sx={{
                      position: "relative",
                      color: isActive ? "#61dafb" : "#e0e0e0", // एक्टिव कलर
                      fontWeight: isActive ? 700 : 600,
                      textTransform: "none",
                      letterSpacing: "0.7px",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#61dafb",
                        transform: "translateY(-2px)",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: isActive ? "100%" : 0, // एक्टिव के लिए स्थायी अंडरलाइन
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        background:
                          "linear-gradient(90deg, #61dafb, #7c5cff)", // अंडरलाइन के लिए क्लीन ग्रेडिएंट
                        transition: "width 0.4s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {section}
                  </Button>
                </motion.div>
              );
            })}
          </Box>

          {/* मोबाइल मेनू आइकॉन */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: "#61dafb" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* मोबाइल ड्रॉवर कम्पोनेंट */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // मोबाइल पर बेहतर ओपन परफॉरमेंस
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              background: "transparent", // ड्रॉवर खुद ट्रांसपेरेंट है
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;