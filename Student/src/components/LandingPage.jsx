import Community from "./Community/Community";
import * as React from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Footer from "./Footer";

const LandingPage = () => {
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <>
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 10, md: 16 },
          textAlign: "center",
          px: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: small ? "2rem" : medium ? "3rem" : "4rem",
              fontFamily: "'Poppins', sans-serif",
              mb: 2,
            }}
          >
            Discover. Learn. Evolve.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typography
            variant="h6"
            sx={{
              maxWidth: 600,
              mx: "auto",
              fontSize: "1.2rem",
              color: "#ddd",
              fontStyle: "italic",
            }}
          >
            Fuel your curiosity and achieve academic success with tools designed for you.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          <Button
            component={Link}
            to="/chatbot"
            variant="contained"
            size={small ? "medium" : "large"}
            sx={{
              backgroundColor: "#ffd700",
              color: "#000",
              fontWeight: "bold",
              px: 4,
              borderRadius: 3,
              "&:hover": {
                backgroundColor: "#e6c200",
              },
            }}
          >
            Talk to Our AI
          </Button>
          <Button
            component={Link}
            to="/share/notes"
            variant="outlined"
            size={small ? "medium" : "large"}
            sx={{
              borderColor: "#ffd700",
              color: "#ffd700",
              fontWeight: "bold",
              px: 4,
              borderRadius: 3,
              "&:hover": {
                backgroundColor: "rgba(255, 215, 0, 0.1)",
              },
            }}
          >
            Share Your Notes
          </Button>
        </motion.div>
      </Box>

      {/* Feature Section */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          {[
            {
              title: "AI Chatbot",
              desc: "Stuck on a topic? Let our AI-powered tutor help you understand in seconds.",
              link: "/aichatbot",
              btnText: "Try AI",
              icon: "🤖",
            },
            {
              title: "Books",
              desc: "Carefully selected books tailored to help you master your syllabus.",
              link: "category/?category=Books",
              btnText: "Explore Books",
              icon: "📚",
            },
            {
              title: "Notes",
              desc: "Access and organize notes that matter. Your study companion, simplified.",
              link: "category/?category=Notes",
              btnText: "Open Notes",
              icon: "📝",
            },
            {
              title: "Past Papers",
              desc: "Prepare smarter with real exam papers from previous years.",
              link: "category/?category=Previous Year",
              btnText: "Start Practicing",
              icon: "📄",
            },
          ].map((card, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    background: "linear-gradient(to bottom, #ffffffdd, #fefefecc)",
                    color: "#333",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      fontSize: 48,
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ textAlign: "center", mb: 1 }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
                    {card.desc}
                  </Typography>
                  <Button
                    component={Link}
                    to={card.link}
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#ffd700",
                      color: "#000",
                      fontWeight: "bold",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#e6c200",
                      },
                    }}
                  >
                    {card.btnText}
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    <Community  />
    <Footer/>
    </>
  );
};

export default LandingPage;
