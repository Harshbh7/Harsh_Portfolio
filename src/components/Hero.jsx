import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DownloadIcon from "@mui/icons-material/Download";
import userImage from "../assets/User.png";
import resumePDF from "../assets/pdf/Harsh_Sharma_College_Updated_ATS_Resume.pdf"; // ✅ Resume import

// Motion-enabled IconButton
const MotionIconButton = motion(IconButton);

// ✅ Dynamic Roles
const roles = [
  "Full Stack Developer",
  "AI Enthusiast",
  "React & Node.js Expert",
  "Creative Problem Solver",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateX_card = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY_card = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const rotateX_img = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY_img = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / width;
    const y = (clientY - top - height / 2) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Animation Variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box
      id="home"
      onMouseMove={handleMouseMove}
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        color: "white",
        padding: "60px 20px",
        perspective: "1500px",
        backgroundImage: `
          linear-gradient(to bottom right, rgba(10,10,30,0.85), rgba(10,10,40,0.9)),
          url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Animation */}
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

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          rotateX: rotateX_img,
          rotateY: rotateY_img,
        }}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 30px rgba(97,218,251,0.6)",
              "0 0 30px rgba(124,92,255,0.6)",
              "0 0 30px rgba(97,218,251,0.6)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{
            borderRadius: "50%",
            padding: "6px",
            background: "linear-gradient(135deg, #61dafb, #7c5cff)",
          }}
        >
          <Avatar
            src={userImage}
            alt="Harsh Sharma"
            sx={{
              width: { xs: 180, md: 250 },
              height: { xs: 180, md: 250 },
              border: "3px solid rgba(10,10,30,0.8)",
              boxShadow: "0 0 20px rgba(0,0,0,0.4)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        style={{
          zIndex: 2,
          maxWidth: "600px",
          padding: "30px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: { xs: "center", md: "left" },
          rotateX: rotateX_card,
          rotateY: rotateY_card,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "medium",
              mb: 1,
              color: "#e0e0e0",
              fontSize: "1.1rem",
            }}
          >
            Hi there! 👋 I'm
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textShadow: "0 3px 12px rgba(0,0,0,0.5)",
              fontSize: { xs: "2.5rem", sm: "3.5rem" },
              "@keyframes shine": {
                "0%": { backgroundPosition: "0% 50%" },
                "100%": { backgroundPosition: "300% 50%" },
              },
            }}
          >
            <motion.span
              style={{
                background: "linear-gradient(90deg, #61dafb, #7c5cff, #61dafb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "300%",
                animation: "shine 6s linear infinite",
              }}
            >
              Harsh Sharma
            </motion.span>
          </Typography>
        </motion.div>

        {/* Role Ticker */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontFamily: "'Courier New', monospace",
              color: "#61dafb",
              height: "1.2em",
              minWidth: { md: "24ch" },
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ display: "inline-block" }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", md: "flex-start" },
              gap: 2,
            }}
          >
            {/* My Projects */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                startIcon={<RocketLaunchIcon />}
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
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                My Projects
              </Button>
            </motion.div>

            {/* Resume Button */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
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
                href={resumePDF}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                My Resume
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: 2,
            }}
          >
            <MotionIconButton
              href="https://github.com/Harshbh7"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              sx={{
                color: "#b0b0b0",
                "&:hover": {
                  color: "#ffffff",
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <FaGithub size={28} />
            </MotionIconButton>
            <MotionIconButton
              href="https://www.linkedin.com/in/harshbh7/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              sx={{
                color: "#b0b0b0",
                "&:hover": {
                  color: "#0A66C2",
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <FaLinkedin size={28} />
            </MotionIconButton>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Hero;
