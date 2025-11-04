import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapPin } from 'react-icons/fa'; // कर्सर के लिए एक अच्छा आइकॉन

// आप यहाँ जितने चाहें रंग डाल सकते हैं
const colors = ['#ff4757', '#2ed573', '#1e90ff', '#feca57']; // लाल, हरा, नीला, पीला

const ExplanationMarker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [colorIndex, setColorIndex] = useState(0);
  const [messages, setMessages] = useState([]);

  const currentColor = colors[colorIndex];

  // 1. माउस की पोजीशन को ट्रैक करने के लिए
  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // 2. कीबोर्ड शॉर्टकट को सुनने के लिए
  useEffect(() => {
    const handleKeyDown = (e) => {
      
      // --- 'c' दबाने पर रंग बदलें ---
      if (e.key.toLowerCase() === 'c') {
        e.preventDefault(); // डिफ़ॉल्ट ब्राउज़र व्यवहार को रोकें
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      }

      // --- 'm' दबाने पर मार्कर टेक्स्ट दिखाएँ ---
      if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        
        // यूज़र से टेक्स्ट पूछें
        const text = prompt('मार्कर टेक्स्ट (Marker Text):', 'इसे देखें!');
        
        if (text) {
          const newMessage = {
            id: Date.now(),
            text: text,
            x: position.x,
            y: position.y,
            color: currentColor,
          };
          
          // मैसेज को स्टेट में जोड़ें
          setMessages((prev) => [...prev, newMessage]);

          // --- 5 सेकंड बाद मैसेज को हटा दें ---
          setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
          }, 5000); // 5000ms = 5 सेकंड
        }
      }
    };

    // यह आपके App.jsx के keyHandler के साथ काम करेगा
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);

  }, [position, currentColor]); // जब पोजीशन या रंग बदले तो यह इफ़ेक्ट दोबारा सिंक हो

  return (
    <>
      {/* --- आपका नया कस्टम कर्सर --- */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: position.x,
          y: position.y,
          color: currentColor,
          pointerEvents: 'none', // ताकि यह क्लिक्स को ब्लॉक न करे
          zIndex: 9999,
          translateX: '-50%', // आइकॉन को माउस पर सेंटर करें
          translateY: '-50%',
          transition: 'color 0.3s ease',
        }}
      >
        <FaMapPin size={24} style={{ filter: `drop-shadow(0 0 5px ${currentColor})` }} />
      </motion.div>

      {/* --- 5 सेकंड वाले टेक्स्ट मार्कर यहाँ दिखेंगे --- */}
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              position: 'fixed',
              left: msg.x,
              top: msg.y,
              transform: 'translateX(-50%)',
              marginTop: '20px', // कर्सर से थोड़ा नीचे
              background: msg.color,
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: 'bold',
              boxShadow: `0 4px 15px ${msg.color}80`, // ग्लो इफ़ेक्ट
              pointerEvents: 'none',
              zIndex: 9998,
              textAlign: 'center',
            }}
          >
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default ExplanationMarker;