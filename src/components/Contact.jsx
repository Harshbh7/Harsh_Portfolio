import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import attractImg from "../assets/attract-users.png"; // ✅ image import

const Contact = () => {
  return (
    <Box
      id="contact"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        px: 2,
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        elevation={12}
        sx={{
          width: "90%",
          maxWidth: "1100px",
          borderRadius: 4,
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          p: { xs: 3, sm: 5 },
          color: "white",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Left Side - Image + Contact Info */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          {/* Get in Touch Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              background: "linear-gradient(45deg, #00b4db, #0083b0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Get in Touch
          </Typography>

          {/* Image */}
          <Box
            component={motion.img}
            src={attractImg}
            alt="Get in touch"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              width: "100%",
              maxWidth: "320px",
              borderRadius: 3,
              objectFit: "contain",
            }}
          />

          {/* Contact Info below image */}
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            <Typography>
              <FaEnvelope /> harsh@example.com
            </Typography>
            <Typography>
              <FaPhoneAlt /> +91 9876543210
            </Typography>
            <Typography>
              <FaMapMarkerAlt /> Delhi, India
            </Typography>
          </Stack>
        </Box>

        {/* Right Side - Contact Form */}
        <Box
          component="form"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: "300px",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              borderRadius: 1,
              input: { color: "black" },
            }}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              borderRadius: 1,
              input: { color: "black" },
            }}
          />
          <TextField
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              borderRadius: 1,
              textarea: { color: "black" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              alignSelf: "center",
              width: "40%",
              mt: 1,
              borderRadius: 3,
              textTransform: "none",
              background: "linear-gradient(45deg, #00b4db, #0083b0)",
              "&:hover": {
                background: "linear-gradient(45deg, #0083b0, #00b4db)",
              },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Contact;
