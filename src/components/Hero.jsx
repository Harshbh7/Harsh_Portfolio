import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence, // ✅ 3D-Tilt और Ticker के लिए नए इम्पोर्ट
} from "framer-motion";
import {
  Button,
  Typography,
  Box,
  Avatar,
  IconButton, // ✅ नया इम्पोर्ट
} from "@mui/material";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"; // ✅ नया इम्पोर्ट
import DownloadIcon from "@mui/icons-material/Download"; // ✅ नया इम्पोर्ट
import userImage from "../assets/User.png";

// मोशन के साथ MUI IconButton को कम्बाइन करना
const MotionIconButton = motion(IconButton);

// ✅ 1. डायनामिक रोल्स के लिए Ticker
const roles = [
  "Full Stack Developer",
  "AI Enthusiast",
  "React & Node.js Expert",
  "Creative Problem Solver",
];

const Hero = () => {
  // --- Ticker State ---
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000); // हर 3 सेकंड में रोल बदलें
    return () => clearInterval(interval);
  }, []);

  // --- ✅ 2. 3D Parallax Tilt के लिए Hooks ---
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

  // --- ✅ 3. Staggered Intro के लिए Variants ---
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // एक-एक करके 0.1s के गैप में
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box
      id="home"
      onMouseMove={handleMouseMove} // ✅ माउस मूवमेंट को सुनें
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" }, // ✅ बदला हुआ क्रम
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        color: "white",
        padding: "60px 20px",
        perspective: "1500px", // ✅ 3D इफ़ेक्ट के लिए यह ज़रूरी है
        // ✅ आपका ओरिजिनल बैकग्राउंड (कोई बदलाव नहीं)
        backgroundImage: `
          linear-gradient(to bottom right, rgba(10,10,30,0.85), rgba(10,10,40,0.9)),
          url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* ✅ आपका ओरिजिनल ग्लोइंग एनीमेशन (कोई बदलाव नहीं) */}
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

      {/* --- 4. इमेज (3D Tilt के साथ) --- */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          rotateX: rotateX_img, // ✅ 3D Tilt लागू किया
          rotateY: rotateY_img, // ✅ 3D Tilt लागू किया
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
              border: "3px solid rgba(10,10,30,0.8)", // डार्क बॉर्डर
              boxShadow: "0 0 20px rgba(0,0,0,0.4)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* --- 5. कंटेंट कार्ड (Staggered Intro के साथ) --- */}
      <motion.div
        style={{
          zIndex: 2,
          maxWidth: "600px",
          padding: "30px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: { xs: "center", md: "left" }, // ✅ प्रोफेशनल अलाइनमेंट
          rotateX: rotateX_card, // ✅ 3D Tilt लागू किया
          rotateY: rotateY_card, // ✅ 3D Tilt लागू किया
        }}
        variants={containerVariants} // ✅ Stagger
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
            variant="h2" // ✅ थोड़ा बड़ा
            sx={{
              fontWeight: "bold",
              mb: 2,
              textShadow: "0 3px 12px rgba(0,0,0,0.5)",
              fontSize: { xs: "2.5rem", sm: "3.5rem" },
              // ✅ हैडर से मिलता-जुलता शाइन एनीमेशन
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

        {/* --- ✅ 6. नया Role Ticker --- */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h5" // थोड़ा बड़ा फ़ॉन्ट
            sx={{
              mb: 4,
              fontFamily: "'Courier New', monospace",
              color: "#61dafb", // एक्सेंट कलर
              height: "1.2em", // जगह फिक्स रखने के लिए
              minWidth: { md: "24ch" }, // बाएं अलाइनमेंट को स्थिर रखने के लिए
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

        {/* --- 7. बेहतर बटन --- */}
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
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                startIcon={<RocketLaunchIcon />} // ✅ आइकॉन
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
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />} // ✅ आइकॉन
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
                href="/Harsh_Sharma_Resume.pdf" // सुनिश्चित करें कि यह पाथ 'public' फोल्डर में सही है
                download
              >
                My Resume
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* --- 8. बेहतर सोशल आइकन्स --- */}
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