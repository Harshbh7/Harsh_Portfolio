import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { Box, Typography } from "@mui/material";

// Staggered एनीमेशन के लिए Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  // --- 3D Parallax Tilt के लिए Hooks ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX_card = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY_card = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / width;
    const y = (clientY - top - height / 2) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <Box
      id="about"
      onMouseMove={handleMouseMove}
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        perspective: "1500px",
        color: "white",
        
        // === ✅ यहाँ बदलाव किया गया है ===
        // 1. पहला लेयर: गहरा नीला ग्रेडिएंट (हल्का पारदर्शी)
        // 2. दूसरा लेयर: बैकग्राउंड इमेज
        backgroundImage: `
          linear-gradient(180deg, rgba(10, 25, 47, 0.9) 0%, rgba(13, 42, 76, 0.95) 100%),
          url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1950&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // ✅ Parallax स्क्रॉल इफ़ेक्ट के लिए
        // ===============================
      }}
    >
      {/* ग्लोइंग पल्स (यह अब ज़्यादा अच्छा दिखेगा) */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 10% 30%, rgba(97,218,251,0.15), transparent 40%)",
            "radial-gradient(circle at 90% 70%, rgba(124,92,255,0.15), transparent 40%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 40%)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2, px: 2, maxWidth: 900 }}>

        {/* --- 2. मुख्य कंटेंट कार्ड (3D Tilt के साथ) --- */}
        <motion.div
          style={{
            rotateX: rotateX_card,
            rotateY: rotateY_card,
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* ✅ ग्लासमोर्फिक कार्ड (कोई बदलाव नहीं, यह अब बैकग्राउंड इमेज को ब्लर करेगा) */}
          <Box
            sx={{
              backdropFilter: "blur(12px)", // यह बैकग्राउंड इमेज को ब्लर करेगा
              background: "rgba(10, 25, 41, 0.7)", // यह कार्ड को डार्क टिंट देगा
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              p: { xs: 4, md: 5 },
              mx: "auto",
              borderRadius: "20px",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 3,
              alignItems: "center",
              textAlign: "center",
              maxWidth: 700,
            }}
          >
            {/* --- 3. टेक्स्ट कंटेंट --- */}
            <Box>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: "#e0e0e0",
                  }}
                >
                  Hello! I’m <b>Harsh Sharma</b> — a passionate{" "}
                  <b style={{ color: "#61dafb" }}>Full Stack Developer</b> and{" "}
                  <b style={{ color: "#7c5cff" }}>AI Enthusiast</b>.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.7,
                    mb: 3,
                  }}
                >
                  I specialize in building a wide range of digital solutions,
                  including dynamic <b style={{ color: "#61dafb" }}>websites</b>,
                  high-performance <b style={{ color: "#7c5cff" }}>software</b>,
                  and intuitive <b style={{ color: "#00ffe0" }}>mobile apps</b>.
                  Using modern tools like <b>React</b>, <b>Node.js</b>, and{" "}
                  <b>AI</b>, I love merging creativity and technology to deliver
                  engaging digital experiences.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    background: "rgba(97, 218, 251, 0.05)",
                    border: "1px solid rgba(97, 218, 251, 0.2)",
                    borderRadius: "12px",
                    p: 2.5,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      lineHeight: 1.7,
                      fontStyle: "italic",
                    }}
                  >
                    My practical experience is backed by a valuable{" "}
                    <b>internship</b> and participation in multiple{" "}
                    <b style={{ color: "#61dafb" }}>Hackathons</b> (like{" "}
                    <b>SIH</b> & <b>GeeksforGeeks</b>). These opportunities have
                    honed my skills in teamwork and real-world problem-solving.
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default About;