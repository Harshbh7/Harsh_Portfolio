import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Updated Project Data
const projects = [
  {
    name: "Charity Website",
    desc: "A donation and fundraising platform for NGOs and volunteers to manage campaigns efficiently.",
    tech: "React, Firebase, MUI, Node.js",
    link: "https://github.com/Harshbh7/Charity",
    live: "https://charity-app.vercel.app",
    img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chat App",
    desc: "A real-time chat application with Firebase authentication and instant messaging.",
    tech: "React, Firebase, CSS",
    link: "https://github.com/Harshbh7/Chat-App",
    live: "https://chat-app-harsh.vercel.app",
    img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "YourShop (E-Commerce)",
    desc: "A fully responsive e-commerce store with search, filter, and cart functionality.",
    tech: "React, Vite, Firebase, MUI",
    link: "https://github.com/Harshbh7/YourShop",
    live: "https://your-shop-three.vercel.app",
    img: "https://userway.org/blog/wp-content/uploads/2022/01/Reasons-to-make-your-e-commerce-accessible.jpg", // 🛒 Ecommerce image
  },
  {
    name: "College Management System",
    desc: "An advanced college portal managing attendance, courses, exams, and student records.",
    tech: "React, Firebase, Node.js, MUI",
    link: "https://github.com/Harshbh7/college",
    live: "https://college-lemon.vercel.app",
    img: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Company Landing Page (LnB Project)",
    desc: "A professional landing page with testimonials, smooth animations, and responsive design.",
    tech: "React, Tailwind CSS, Flowbite React",
    link: "https://github.com/Harshbh7/LnB_Project",
    live: "https://n-b-project.vercel.app",
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "E-Pramaan (School Facial Attendance)",
    desc: "An AI-based attendance system that uses facial recognition for student attendance.",
    tech: "Python, OpenCV, Firebase, Streamlit",
    link: "https://github.com/Harshbh7/Praman",
    live: "https://praman-mu.vercel.app",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80", // 🧠 Facial recognition image
  },
];

// ✅ Custom Arrows
const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      right: "-60px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "60px",
      color: "#9cdcfe",
      zIndex: 5,
      cursor: "pointer",
      transition: "0.3s",
      "&:hover": { color: "#61dafb" },
    }}
  >
    ❯
  </Box>
);

const PrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      left: "-60px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "60px",
      color: "#9cdcfe",
      zIndex: 5,
      cursor: "pointer",
      transition: "0.3s",
      "&:hover": { color: "#61dafb" },
    }}
  >
    ❮
  </Box>
);

const Projects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box
      id="projects"
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ✅ Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
            url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* ✅ Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "1024px",
          height: "728px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          My Projects
        </Typography>

        <Box sx={{ width: "92%", maxWidth: "950px" }}>
          <Slider {...settings}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  padding: "0 15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    width: 420,
                    height: 380,
                    borderRadius: 3,
                    overflow: "hidden",
                    color: "white",
                    backgroundImage: `url(${project.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 0 18px rgba(0,0,0,0.6)",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                    },
                  }}
                >
                  {/* Content */}
                  <CardContent
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      textAlign: "center",
                      p: 3,
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                      {project.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ mb: 2, opacity: 0.9 }}
                    >
                      {project.desc}
                    </Typography>
                    <Typography variant="caption" color="#9cdcfe">
                      {project.tech}
                    </Typography>
                  </CardContent>

                  {/* ✅ Buttons Always Visible */}
                  <CardActions
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      justifyContent: "center",
                      pb: 2,
                      gap: 2,
                    }}
                  >
                    <Button
                      href={project.link}
                      target="_blank"
                      variant="outlined"
                      sx={{
                        color: "#9cdcfe",
                        borderColor: "#9cdcfe",
                        "&:hover": { backgroundColor: "rgba(156,220,254,0.2)" },
                      }}
                    >
                      💻 GitHub
                    </Button>

                    {project.live && (
                      <Button
                        href={project.live}
                        target="_blank"
                        variant="contained"
                        sx={{
                          backgroundColor: "#61dafb",
                          color: "black",
                          fontWeight: "bold",
                          "&:hover": { backgroundColor: "#4ac2e8" },
                        }}
                      >
                        🌐 Live Demo
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
