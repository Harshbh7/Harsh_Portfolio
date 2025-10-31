import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLaptopCode,
  FaMobileAlt,
  FaPenNib,
  FaFire,
  FaCube,
} from "react-icons/fa"; // Added Firebase (FaFire) & Three.js (FaCube)

const skills = [
  {
    icon: <FaLaptopCode size={50} color="#00bcd4" />,
    title: "Full Stack Developer",
    desc: "Building end-to-end web apps with MERN stack and modern tools.",
  },
  {
    icon: <FaReact size={50} color="#61dafb" />,
    title: "React.js",
    desc: "Building dynamic and interactive UIs with reusable components.",
  },
  {
    icon: <FaNodeJs size={50} color="#8cc84b" />,
    title: "Node.js",
    desc: "Creating scalable backend apps using Express and REST APIs.",
  },
  {
    icon: <FaDatabase size={50} color="#fdbb2d" />,
    title: "MongoDB / SQL",
    desc: "Managing structured and unstructured data efficiently.",
  },
  {
    icon: <FaFire size={50} color="#FFCA28" />,
    title: "Firebase",
    desc: "Building secure and real-time apps using Firebase Auth & Database.",
  },
  {
    icon: <FaCube size={50} color="#00e5ff" />,
    title: "Three.js",
    desc: "Creating interactive 3D experiences and animations for the web.",
  },
  {
    icon: <FaMobileAlt size={50} color="#00e676" />,
    title: "Mobile App Developer",
    desc: "Building responsive cross-platform apps using React Native.",
  },
  {
    icon: <FaPenNib size={50} color="#ffb300" />,
    title: "Content Writer",
    desc: "Writing engaging blogs, documentation, and creative tech content.",
  },
];

const Skills = () => {
  return (
    <Box
      id="skills"
      sx={{
        minHeight: "100vh",
        width: "100%",
        textAlign: "center",
        color: "white",
        background: `
          linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(10,10,30,0.9)),
          url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 8,
      }}
    >
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
        My Skills
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        {skills.map((skill, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.07,
                rotateY: 5,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Paper
                elevation={6}
                sx={{
                  width: 230,
                  height: 230,
                  p: 3,
                  borderRadius: "20px",
                  textAlign: "center",
                  backdropFilter: "blur(15px)",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "0.4s",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, rgba(97,218,251,0.25), rgba(124,92,255,0.25))",
                    boxShadow: "0 0 25px rgba(97,218,251,0.4)",
                  },
                }}
              >
                <Box sx={{ mb: 1 }}>{skill.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {skill.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                  }}
                >
                  {skill.desc}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;
