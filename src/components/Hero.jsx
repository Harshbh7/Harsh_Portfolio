import React from "react";
import { motion } from "framer-motion";
import { Button, Typography, Box } from "@mui/material";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Hero = () => {
  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        overflow: "hidden",
        backgroundImage: `
          linear-gradient(to bottom right, rgba(10,10,30,0.85), rgba(10,10,40,0.9)),
          url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Animated gradient glow */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(97,218,251,0.3), transparent 40%)",
            "radial-gradient(circle at 80% 80%, rgba(124,92,255,0.3), transparent 40%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 40%)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />

      {/* Glass container for content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          zIndex: 2,
          padding: "40px 30px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          maxWidth: "700px",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textShadow: "0 3px 12px rgba(0,0,0,0.5)",
          }}
        >
          Hi, I'm{" "}
          <motion.span
            animate={{
              color: ["#61dafb", "#7c5cff", "#00ffe0"],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ fontWeight: "bold" }}
          >
            Harsh Sharma
          </motion.span>
        </Typography>

        {/* Typing animation subtitle */}
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontWeight: 400,
            fontFamily: "'Courier New', monospace",
            whiteSpace: "nowrap",
            overflow: "hidden",
            borderRight: ".15em solid #61dafb",
            width: "22ch",
            mx: "auto",
            animation: "typing 4s steps(22, end) infinite alternate",
            "@keyframes typing": {
              "0%": { width: "0ch" },
              "100%": { width: "22ch" },
            },
          }}
        >
          Full Stack Developer | AI Enthusiast
        </Typography>

        {/* Buttons */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 3 }}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="contained"
              sx={{
                px: 3,
                py: 1.2,
                borderRadius: "30px",
                fontWeight: 600,
                background: "linear-gradient(90deg, #7c5cff, #61dafb)",
                boxShadow: "0 0 20px rgba(124,92,255,0.5)",
                "&:hover": {
                  background: "linear-gradient(90deg, #61dafb, #7c5cff)",
                  boxShadow: "0 0 25px rgba(124,92,255,0.8)",
                },
              }}
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🚀 View Projects
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="outlined"
              sx={{
                px: 3,
                py: 1.2,
                borderRadius: "30px",
                fontWeight: 600,
                borderColor: "#61dafb",
                color: "#61dafb",
                "&:hover": {
                  borderColor: "#7c5cff",
                  color: "#7c5cff",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              href="/Harsh_Sharma_Resume.pdf"
              download
            >
              📄 Download Resume
            </Button>
          </motion.div>
        </Box>

        {/* Social Icons */}
        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <motion.a
            href="https://github.com/Harshbh7"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            style={{ color: "#fff" }}
          >
            <FaGithub size={34} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/harshbh7/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            style={{ color: "#0A66C2" }}
          >
            <FaLinkedin size={34} />
          </motion.a>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Hero;
