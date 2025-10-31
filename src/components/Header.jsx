import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const sections = ["Home", "About", "Skills", "Projects", "Education", "Contact"];

  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: isScrolled
          ? "0 8px 25px rgba(97, 218, 251, 0.15)"
          : "0 4px 20px rgba(255,255,255,0.05)",
        transition: "all 0.4s ease",
        zIndex: 1200,
        overflow: "hidden",
        "&::before": {
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
        {/* Logo with subtle shimmer */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              letterSpacing: "1px",
              cursor: "pointer",
              background: "linear-gradient(90deg, #61dafb, #7c5cff, #61dafb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "300%",
              animation: "shine 6s linear infinite",
              textShadow: "0 0 15px rgba(97, 218, 251, 0.4)",
              "@keyframes shine": {
                "0%": { backgroundPosition: "0% 50%" },
                "100%": { backgroundPosition: "300% 50%" },
              },
            }}
            onClick={() => handleNavClick("home")}
          >
            Harsh Portfolio
          </Typography>
        </motion.div>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          {sections.map((section, index) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Button
                onClick={() => handleNavClick(section.toLowerCase())}
                sx={{
                  position: "relative",
                  color: "#e0e0e0",
                  fontWeight: 600,
                  textTransform: "none",
                  letterSpacing: "0.7px",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#61dafb",
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 0,
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    background:
                      "linear-gradient(90deg, #61dafb, #7c5cff, #61dafb)",
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
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
