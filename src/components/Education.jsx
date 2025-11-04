import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  motion,
  useMotionValue, // ✅ 3D Tilt
  useTransform, // ✅ 3D Tilt
  useSpring, // ✅ 3D Tilt
} from "framer-motion";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent, // ✅ तारीखों के लिए
  TimelineDot,
} from "@mui/lab"; // ✅ MUI Lab से इम्पोर्ट करें
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

// ✅ मोशन के साथ MUI Box को कम्बाइन करना
const MotionBox = motion(Box);

// ✅ डेटा को थोड़ा बेहतर बनाया (तारीखें अलग कीं)
const educationData = [
  {
    year: "2022 - 2025",
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Agra College, Agra",
    icon: <SchoolIcon sx={{ color: "#61dafb" }} />, // ✅ रंग जोड़ा
  },
  {
    year: "Aug 2023 - Feb 2024",
    title: "6-Month Internship",
    institution: "Technoster Pvt. Ltd.",
    icon: <WorkIcon sx={{ color: "#61dafb" }} />,
  },
  {
    year: "June - July 2024",
    title: "2-Month Internship",
    institution: "Learn & Build (LnB)",
    icon: <WorkIcon sx={{ color: "#61dafb" }} />,
  },
  {
    year: "2025 - 2027",
    title: "Master of Computer Applications (MCA)",
    institution: "Lovely Professional University (Pursuing)",
    icon: <SchoolIcon sx={{ color: "#61dafb" }} />,
  },
];

// --- ✅ Staggered एनीमेशन के लिए Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, // ✅ एक-एक करके
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Education = () => {
  // --- ✅ 3D Parallax Tilt के लिए Hooks ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

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
      id="education"
      onMouseMove={handleMouseMove} // ✅ माउस मूवमेंट को सुनें
      sx={{
        minHeight: "100vh",
        width: "100%",
        // ✅ आपका ओरिजिनल बैकग्राउंड (कोई बदलाव नहीं)
        background:
          "linear-gradient(135deg, rgba(10,10,30,0.95), rgba(15,15,40,0.95)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // ✅ फ्लेक्स-स्टार्ट की जगह सेंटर
        py: { xs: 8, md: 12 },
        px: 2,
        overflow: "hidden", // ✅ कंसिस्टेंसी के लिए
        perspective: "1500px", // ✅ 3D Tilt के लिए
      }}
    >
      {/* ग्लोइंग पल्स */}
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

      

      {/* --- ✅ 2. 3D Tilt और Stagger वाला कंटेनर --- */}
      <MotionBox
        style={{
          rotateX: rotateX, // 3D Tilt लागू किया
          rotateY: rotateY, // 3D Tilt लागू किया
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        sx={{
          width: "90%",
          maxWidth: "900px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* --- ✅ 3. MUI Timeline लेआउट --- */}
        <Timeline position="alternate">
          {educationData.map((item, index) => (
            <TimelineItem key={index} component={motion.div} variants={itemVariants}>
              
              {/* --- तारीख / साल --- */}
              <TimelineOppositeContent
                sx={{
                  m: "auto 0",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '1rem' }
                }}
                align="right"
                variant="body2"
              >
                {item.year}
              </TimelineOppositeContent>
              
              {/* --- डॉट और कनेक्टर --- */}
              <TimelineSeparator>
                <TimelineConnector
                  sx={{
                    background:
                      "linear-gradient(#61dafb, #7c5cff)", // ✅ ग्रेडिएंट लाइन
                    height: 30,
                  }}
                />
                <TimelineDot
                  sx={{
                    bgcolor: "#10192e", // ✅ डार्क बैकग्राउंड
                    border: "2px solid #61dafb", // ✅ एक्सेंट बॉर्डर
                    boxShadow: "0 0 10px rgba(97,218,251,0.5)", // ✅ ग्लो
                    p: 1.2,
                  }}
                >
                  {item.icon}
                </TimelineDot>
                <TimelineConnector
                  sx={{
                    background:
                      "linear-gradient(#7c5cff, #61dafb)", // ✅ ग्रेडिएंट लाइन
                    height: 30,
                  }}
                />
              </TimelineSeparator>
              
              {/* --- ग्लासमोर्फिक कार्ड में कंटेंट --- */}
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      borderRadius: "16px",
                      // --- ग्लासमोर्फिज़्म (Skills जैसा) ---
                      backdropFilter: "blur(12px)",
                      background: "rgba(10, 25, 41, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                      color: "white",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8, color: "#e0e0e0" }}
                    >
                      {item.institution}
                    </Typography>
                  </Paper>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </MotionBox>
    </Box>
  );
};

export default Education;