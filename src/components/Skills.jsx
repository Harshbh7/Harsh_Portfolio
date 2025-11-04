import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLaptopCode,
  FaMobileAlt,
  FaPenNib,
  FaFire,
  FaCube,
  FaGitAlt,
  FaDocker,
  FaServer,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiGraphql,
  SiTailwindcss,
  SiExpress,
} from "react-icons/si";

// --- स्किल्स का पहला पेज (आपके ओरिजिनल 8) ---
const skillsPage1 = [
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

// --- स्किल्स का दूसरा पेज (8 नई स्किल्स) ---
const skillsPage2 = [
  {
    icon: <SiTypescript size={50} color="#3178C6" />,
    title: "TypeScript",
    desc: "Writing robust, type-safe JavaScript for large-scale applications.",
  },
  {
    icon: <SiNextdotjs size={50} color="#ffffff" />,
    title: "Next.js",
    desc: "Server-side rendering and static site generation with React.",
  },
  {
    icon: <SiExpress size={50} color="#ffffff" />,
    title: "Express.js",
    desc: "Creating minimal and flexible Node.js web application frameworks.",
  },
  {
    icon: <SiGraphql size={50} color="#E10098" />,
    title: "GraphQL",
    desc: "Querying APIs efficiently and building flexible data-driven apps.",
  },
  {
    icon: <FaGitAlt size={50} color="#F05032" />,
    title: "Git / GitHub",
    desc: "Using version control for effective team collaboration and code management.",
  },
  {
    icon: <FaDocker size={50} color="#2496ED" />,
    title: "Docker",
    desc: "Containerizing applications for consistent development and deployment.",
  },
  {
    icon: <SiTailwindcss size={50} color="#06B6D4" />,
    title: "Tailwind CSS",
    desc: "Rapidly building custom user interfaces with a utility-first CSS framework.",
  },
  {
    icon: <FaServer size={50} color="#FF9900" />,
    title: "CI/CD",
    desc: "Automating build, test, and deployment pipelines for faster delivery.",
  },
];

const allSkills = [skillsPage1, skillsPage2];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Skills = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % allSkills.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const currentSkills = allSkills[currentPage];

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
          url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto-format&fit=crop&w=1600&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 8,
        overflow: "hidden",
      }}
    >

      {/* --- फेडिंग एनीमेशन के लिए Wrapper --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%" }}
        >
          {/* कार्ड्स के स्टैगर एनीमेशन के लिए Wrapper */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ width: "100%" }}
          >
            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{
                width: "90%",
                maxWidth: "1200px",
                mx: "auto",
              }}
            >
              {currentSkills.map((skill, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3} // 4x2 लेआउट
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Paper
                      elevation={6}
                      sx={{
                        // === ✅ यहाँ बदलाव किया गया है ===
                        height: 250,
                        width: 250,
                        // =========================
                        p: 3,
                        borderRadius: "20px",
                        textAlign: "center",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all 0.4s ease",
                        backdropFilter: "blur(12px)",
                        background: "rgba(10, 25, 41, 0.7)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        "& .icon-box": {
                          transition: "all 0.3s ease-in-out",
                        },
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, rgba(97,218,251,0.2), rgba(124,92,255,0.2))",
                          boxShadow: "0 0 30px rgba(97,218,251,0.4)",
                          "& .icon-box": {
                            transform: "scale(1.15) rotate(5deg)",
                          },
                        },
                      }}
                    >
                      <Box className="icon-box" sx={{ mb: 2 }}>
                        {skill.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
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
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Skills;