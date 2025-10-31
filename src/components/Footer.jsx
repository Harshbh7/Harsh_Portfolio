import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: "center",
        color: "white",
        background: `
          linear-gradient(135deg, rgba(63,81,181,0.9), rgba(0,188,212,0.9)),
          url('https://www.transparenttextures.com/patterns/geometry.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        mt: 10,
      }}
    >
      {/* Floating soft glow effect */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15), transparent 60%)",
          zIndex: 1,
          animation: "pulse 6s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.7 },
            "100%": { opacity: 1 },
          },
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #fff, #d1c4e9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Let’s Connect 🤝
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mb: 3,
          }}
        >
          {[
            {
              icon: <FaGithub size={30} />,
              link: "https://github.com/",
              color: "#fff",
            },
            {
              icon: <FaLinkedin size={30} />,
              link: "https://linkedin.com/",
              color: "#0077b5",
            },
            {
              icon: <FaEnvelope size={30} />,
              link: "mailto:harsh@example.com",
              color: "#ffeb3b",
            },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: item.color,
                transition: "all 0.3s ease",
              }}
            >
              {item.icon}
            </motion.a>
          ))}
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            letterSpacing: 0.5,
          }}
        >
          © {new Date().getFullYear()} <b>Harsh Sharma</b> — Built with ❤️ using React + MUI + Framer Motion
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
