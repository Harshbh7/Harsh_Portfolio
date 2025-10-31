import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Box
      id="about"
      className="section"
      sx={{
        position: "relative",
        height: "100vh", // 👈 full height
        width: "100%", // 👈 full width
        textAlign: "center",
        color: "white",
        overflow: "hidden",
        backgroundImage: `
          linear-gradient(to bottom right, rgba(0,0,0,0.1), rgba(0,0,0,0.4)),
          url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.2 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(97,218,251,0.25), rgba(124,92,255,0.25))",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2, px: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 4,
            background: "linear-gradient(90deg, #61dafb, #7c5cff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Me
        </Typography>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Paper
            elevation={5}
            sx={{
              backdropFilter: "blur(15px)",
              background: "rgba(255, 255, 255, 0.08)",
              p: { xs: 3, md: 5 },
              maxWidth: 750,
              mx: "auto",
              borderRadius: "25px",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
            }}
          >
            <Avatar
              src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
              alt="Harsh Sharma"
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                border: "3px solid rgba(255,255,255,0.6)",
                boxShadow: "0 0 25px rgba(97,218,251,0.4)",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 500,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Hello! I’m <b>Harsh Sharma</b> — a passionate{" "}
              <b style={{ color: "#61dafb" }}>Full Stack Developer</b> and{" "}
              <b style={{ color: "#7c5cff" }}>AI Enthusiast</b>.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.8,
                maxWidth: 650,
                mx: "auto",
              }}
            >
              I specialize in building high-performance and visually stunning
              web applications using <b>React</b>, <b>Node.js</b>, and <b>AI</b> tools.
              I love merging creativity and technology to deliver engaging digital
              experiences that truly make a difference.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 3,
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              I’ve proudly participated in multiple{" "}
              <b style={{ color: "#61dafb" }}>Hackathons</b> — including{" "}
              <b>Smart India Hackathon (SIH)</b> and{" "}
              <b>GeeksforGeeks Hackathons</b> — where I honed my skills in
              teamwork, problem-solving, and real-world software development.
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default About;
