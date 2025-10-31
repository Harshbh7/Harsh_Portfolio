import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import TimelineDot from "@mui/lab/TimelineDot";


const Education = () => {
  const educationData = [
    {
      title: "Bachelor of Computer Applications (BCA) (2022 - 2025)",
      institution: "Agra College, Agra",
      icon: <SchoolIcon />,
    },
    {
      title: "6-Month Internship (Aug 2023 - Feb 2024)",
      institution: "Technoster Pvt. Ltd.",
      icon: <WorkIcon />,
    },
    {
      title: "2-Month Internship (June - July 2024)",
      institution: "Learn & Build (LnB)",
      icon: <WorkIcon />,
    },
    {
      title: "Master of Computer Applications (MCA) (2025 - 2027)",
      institution: "Lovely Professional University (Pursuing)",
      icon: <SchoolIcon />,
    },
  ];

  return (
  <Box
    id="education"
    sx={{
      minHeight: "100vh",
      width: "100%",
      background:
        "linear-gradient(135deg, rgba(10,10,30,0.95), rgba(15,15,40,0.95)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      py: { xs: 6, md: 10 },
      px: 2,
      pb: 12, // 👈 extra bottom padding added
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        mb: 5,
        textAlign: "center",
        background: "linear-gradient(45deg, #00b4db, #0083b0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      component={motion.div}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Education & Experience
    </Typography>

    <Stack
      spacing={3}
      sx={{
        width: "90%",
        maxWidth: "800px",
        mb: 6, // 👈 gives space at the bottom
      }}
    >
      {educationData.map((item, index) => (
        <Paper
          key={index}
          component={motion.div}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            p: 3,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(15px)",
            color: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 3,
            borderLeft: "4px solid #00b4db",
            "&:hover": {
              transform: "translateY(-6px)",
              transition: "all 0.3s ease",
            },
          }}
        >
          <TimelineDot
            sx={{
              bgcolor: "#00b4db",
              transform: "scale(1.3)",
              mr: 1,
            }}
          >
            {item.icon}
          </TimelineDot>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {item.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              {item.institution}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  </Box>
);

};

export default Education;
