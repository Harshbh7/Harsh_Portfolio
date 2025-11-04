import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Chip,
} from "@mui/material";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// --- प्रोजेक्ट डेटा (कोई बदलाव नहीं) ---
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
    img: "https://userway.org/blog/wp-content/uploads/2022/01/Reasons-to-make-your-e-commerce-accessible.jpg",
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
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80",
  },
];

// --- कस्टम एरो (कोई बदलाव नहीं) ---
const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      right: { xs: "-20px", md: "-60px" },
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: { xs: "40px", md: "60px" },
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
      left: { xs: "-20px", md: "-60px" },
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: { xs: "40px", md: "60px" },
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

// मोशन के साथ MUI Box को कम्बाइन करना
const MotionBox = motion(Box);

const Projects = () => {
  // --- 1. 3D Parallax Tilt (कोई बदलाव नहीं) ---
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

  // --- 2. Slider Settings ---
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 1 },
      },
    ],
    // --- ✅ यहाँ बदलाव किया गया है ---
    appendDots: (dots) => (
      <Box sx={{ bottom: "-50px" }}> 
        {/* यह डॉट्स को स्लाइडर से 50px नीचे रखेगा */}
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </Box>
    ),
    // --- --------------------- ---
    customPaging: (i) => (
      <Box
        sx={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.4)",
          transition: "0.3s",
        }}
      />
    ),
  };

  return (
    <Box
      id="projects"
      onMouseMove={handleMouseMove}
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // यह कंटेंट (टाइटल + स्लाइडर) को वर्टिकली सेंटर में रखेगा
        alignItems: "center",
        py: 12, // ऊपर-नीचे थोड़ी पैडिंग
        perspective: "1500px",
      }}
    >
      {/* --- बैकग्राउंड (कोई बदलाव नहीं) --- */}
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
          backgroundAttachment: "fixed",
          zIndex: 0,
        }}
      />
      {/* ग्लोइंग पल्स (कोई बदलाव नहीं) */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 10% 30%, rgba(97,218,251,0.1), transparent 40%)",
            "radial-gradient(circle at 90% 70%, rgba(124,92,255,0.1), transparent 40%)",
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

     

      {/* --- 4. 3D Tilt के साथ स्लाइडर (कोई बदलाव नहीं) --- */}
      <MotionBox
        style={{
          rotateX: rotateX_card,
          rotateY: rotateY_card,
        }}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "90%",
          maxWidth: "1400px",
        }}
      >
        <Slider {...settings}>
          {projects.map((project, index) => (
            <Box key={index} sx={{ px: { xs: 1, sm: 2 } }}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{ height: "100%" }}
              >
                {/* --- 5. ग्लासमोर्फिक कार्ड (कोई बदलाव नहीं) --- */}
                <Card
                  sx={{
                    height: "550px",
                    borderRadius: "20px",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backdropFilter: "blur(12px)",
                    background: "rgba(10, 25, 41, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgba(97,218,251,0.15), rgba(124,92,255,0.15))",
                      boxShadow: "0 0 30px rgba(97,218,251,0.3)",
                    },
                  }}
                >
                  {/* --- इमेज --- */}
                  <CardMedia
                    component="img"
                    height="220"
                    image={project.img}
                    alt={project.name}
                    sx={{ objectFit: "cover" }}
                  />

                  {/* --- कंटेंट --- */}
                  <CardContent
                    sx={{
                      textAlign: "left",
                      p: 3,
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {project.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ mb: 2, opacity: 0.85, minHeight: "60px" }}
                    >
                      {project.desc}
                    </Typography>

                    {/* --- 6. टेक स्टैक Chips --- */}
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.7, mb: 1, display: "block" }}
                    >
                      Tech Stack:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {project.tech.split(", ").map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(97, 218, 251, 0.1)",
                            color: "#61dafb",
                            border: "1px solid rgba(97, 218, 251, 0.2)",
                            fontSize: "0.75rem",
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>

                  {/* --- 7. बेहतर बटन --- */}
                  <CardActions
                    sx={{
                      justifyContent: "flex-start",
                      p: 3,
                      pt: 0,
                      gap: 1.5,
                    }}
                  >
                    <Button
                      href={project.link}
                      target="_blank"
                      variant="outlined"
                      startIcon={<FaGithub />}
                      sx={{
                        borderRadius: "30px",
                        borderColor: "#61dafb",
                        color: "#61dafb",
                        "&:hover": {
                          borderColor: "#7c5cff",
                          color: "#7c5cff",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      GitHub
                    </Button>
                    {project.live && (
                      <Button
                        href={project.live}
                        target="_blank"
                        variant="contained"
                        startIcon={<FaExternalLinkAlt />}
                        sx={{
                          borderRadius: "30px",
                          fontWeight: 600,
                          color: "white",
                          background:
                            "linear-gradient(90deg, #7c5cff, #61dafb)",
                          boxShadow: "0 0 15px rgba(124,92,255,0.4)",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #61dafb, #7c5cff)",
                            boxShadow: "0 0 20px rgba(124,92,255,0.6)",
                          },
                        }}
                      >
                        Live Demo
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Slider>
      </MotionBox>
    </Box>
  );
};

export default Projects;