import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  styled, // ✅ TextField को स्टाइल करने के लिए
} from "@mui/material";
import {
  motion,
  useMotionValue, // ✅ 3D Tilt
  useTransform, // ✅ 3D Tilt
  useSpring, // ✅ 3D Tilt
} from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane, // ✅ बटन के लिए
} from "react-icons/fa";
import attractImg from "../assets/attract-users.png";

// --- ✅ 1. स्टाइल्ड टेक्स्ट फील्ड ---
// यह सादे TextField को ग्लासमोर्फिक थीम में बदल देगा
const StyledTextField = styled(TextField)({
  // लेबल का रंग (नार्मल)
  "& label": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  // लेबल का रंग (फोकस होने पर)
  "& label.Mui-focused": {
    color: "#61dafb", // एक्सेंट कलर
  },
  "& .MuiInputBase-root": {
    color: "white", // इनपुट टेक्स्ट का रंग
    backgroundColor: "rgba(255, 255, 255, 0.1)", // सेमी-ट्रांसपेरेंट बैकग्राउंड
    backdropFilter: "blur(5px)",
    borderRadius: "8px",
    "&.Mui-focused": {
      boxShadow: "0 0 10px rgba(97, 218, 251, 0.5)", // फोकस होने पर ग्लो
    },
    // अंडरलाइन को हटाना (variant="filled" के लिए)
    "&:before, &:after, &:hover:before, &:hover:after": {
      borderBottom: "none !important",
    },
  },
});

// --- ✅ 2. Staggered एनीमेशन के लिए Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" } },
};

const Contact = () => {
  // --- ✅ 3. 3D Parallax Tilt के लिए Hooks ---
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
      id="contact"
      onMouseMove={handleMouseMove} // ✅ माउस मूवमेंट को सुनें
      sx={{
        width: "100%", // vw की जगह %
        minHeight: "100vh", // height की जगह minHeight
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // ✅ आपका ओरिजिनल बैकग्राउंड (कोई बदलाव नहीं)
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // ✅ Parallax इफ़ेक्ट
        px: 2,
        py: 8,
        perspective: "1500px", // ✅ 3D Tilt के लिए
        overflow: "hidden",
      }}
    >
      {/* ग्लोइंग पल्स */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(97,218,251,0.1), transparent 40%)",
            "radial-gradient(circle at 80% 20%, rgba(124,92,255,0.1), transparent 40%)",
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

      <Box sx={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1100px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* --- ✅ 4. बेहतर "Shine" टाइटल --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mb: 6, // मार्जिन बढ़ाया
              background: "linear-gradient(90deg, #61dafb, #7c5cff, #61dafb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "300%",
              animation: "shine 6s linear infinite",
              "@keyframes shine": {
                "0%": { backgroundPosition: "0% 50%" },
                "100%": { backgroundPosition: "200% 50%" },
              },
            }}
          >
            Get in Touch
          </Typography>
        </motion.div>

        {/* --- ✅ 5. 3D Tilt और डार्क ग्लासमोर्फिक कार्ड --- */}
        <Paper
          component={motion.div}
          style={{
            rotateX: rotateX, // 3D Tilt लागू किया
            rotateY: rotateY, // 3D Tilt लागू किया
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          elevation={12}
          sx={{
            width: "100%",
            borderRadius: "20px", // कंसिस्टेंट रेडियस
            // --- डार्क ग्लासमोर्फिज़्म (Projects जैसा) ---
            backdropFilter: "blur(12px)",
            background: "rgba(10, 25, 41, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            // -------------------------------------
            p: { xs: 3, sm: 5 },
            color: "white",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 5, // गैप बढ़ाया
          }}
        >
          {/* --- लेफ्ट साइड - इमेज + कॉन्टैक्ट इन्फो --- */}
          <Box
            component={motion.div}
            variants={itemVariants} // Stagger
            sx={{
              width: { xs: "100%", md: "45%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 3,
            }}
          >
            {/* इमेज */}
            <Box
              component={motion.img}
              src={attractImg}
              alt="Get in touch"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                width: "100%",
                maxWidth: { xs: "280px", md: "320px" },
                borderRadius: 3,
                objectFit: "contain",
              }}
            />

            {/* कॉन्टैक्ट इन्फो */}
            <Stack spacing={2} sx={{ mt: 2, alignItems: "flex-start" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <FaEnvelope color="#61dafb" />
                <Typography>harsh@example.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <FaPhoneAlt color="#61dafb" />
                <Typography>+91 9876543210</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <FaMapMarkerAlt color="#61dafb" />
                <Typography>Delhi, India</Typography>
              </Box>
            </Stack>
          </Box>

          {/* --- राइट साइड - कॉन्टैक्ट फॉर्म --- */}
          <Box
            component={motion.form}
            variants={itemVariants} // Stagger
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 3, // गैप बढ़ाया
              width: "100%",
            }}
          >
            <StyledTextField
              label="Your Name"
              variant="filled" // ✅ variant बदला
              fullWidth
            />
            <StyledTextField
              label="Email Address"
              variant="filled" // ✅ variant बदला
              fullWidth
            />
            <StyledTextField
              label="Your Message"
              variant="filled" // ✅ variant बदला
              multiline
              rows={4}
              fullWidth
            />
            {/* --- ✅ 6. बेहतर बटन --- */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<FaPaperPlane />}
                sx={{
                  width: "100%", // फुल विड्थ
                  mt: 1,
                  borderRadius: "30px",
                  fontWeight: 600,
                  color: "white",
                  py: 1.2,
                  background: "linear-gradient(90deg, #7c5cff, #61dafb)",
                  boxShadow: "0 0 20px rgba(124,92,255,0.5)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #61dafb, #7c5cff)",
                    boxShadow: "0 0 25px rgba(124,92,255,0.8)",
                  },
                }}
              >
                Send Message
              </Button>
            </motion.div>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Contact;