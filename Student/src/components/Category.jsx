import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Container,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { getAllNotes } from "./Api";
import BasicCard from "./NotesCard";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function a11yProps(index) {
  return {
    id: `category-tab-${index}`,
    "aria-controls": `category-tabpanel-${index}`,
  };
}

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`category-tabpanel-${index}`}
      aria-labelledby={`category-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: { xs: 3, md: 5 } }}>{children}</Box>}
    </div>
  );
}

const Category = () => {
  const [value, setValue] = useState(0);
  const [notes, setNotes] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const myParam = queryParams.get("category");
  const [category, setCategory] = useState(myParam || "");
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllNotes(category);
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    getData();
  }, [category]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        py: { xs: 6, md: 10 },
        minHeight: "85vh",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant={isSmall ? "h4" : "h3"}
          align="center"
          fontWeight={700}
          sx={{
            mb: 5,
            letterSpacing: "0.1em",
            color: "#ffd700",
            textShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
          }}
        >
          Browse Study Notes by Year
        </Typography>

        <Box
          sx={{
            borderBottom: 2,
            borderColor: "#ffd700",
            display: "flex",
            justifyContent: "center",
            mb: 6,
          }}
          role="tablist"
          aria-label="Study notes categories by year"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant={isSmall ? "scrollable" : "standard"}
            scrollButtons
            allowScrollButtonsMobile
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="Year selection tabs"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#ffd700",
                height: 4,
                borderRadius: 2,
              },
            }}
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={index}
                label={label}
                {...a11yProps(index)}
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                  color: value === index ? "#ffd700" : "rgba(255, 255, 255, 0.7)",
                  textTransform: "none",
                  px: { xs: 1.5, md: 3 },
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {tabLabels.map((_, yearIndex) => (
          <CustomTabPanel value={value} index={yearIndex} key={yearIndex}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 4,
              }}
              aria-live="polite"
            >
              {notes
                .filter((note) => note.year === `${yearIndex + 1}`)
                .map((note, idx) => (
                  <motion.div
                    key={note._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.07,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <BasicCard
                      category={note.category}
                      subjectCode={note.subjectCode}
                      subjectName={note.subjectName}
                      fileUrl={note.file}
                      year={note.year}
                    />
                  </motion.div>
                ))}

              {/* No Notes Message */}
              {notes.filter((note) => note.year === `${yearIndex + 1}`).length === 0 && (
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    width: "100%",
                    color: "rgba(255, 255, 255, 0.6)",
                    fontStyle: "italic",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                  }}
                >
                  No notes available for {tabLabels[yearIndex]}. Check back soon!
                </Typography>
              )}
            </Box>
          </CustomTabPanel>
        ))}

        {/* Why Choose Us Section */}
<section
  style={{
    background: "#1c1c1c",
    color: "#fff",
    padding: "4rem 1rem",
    marginTop: "4rem",
    borderRadius: "16px",
    boxShadow: "0 0 30px rgba(255, 215, 0, 0.1)",
  }}
>
  <Container maxWidth="md">
    <Typography
      variant="h4"
      align="center"
      fontWeight={700}
      gutterBottom
      sx={{
        color: "#ffd700",
        textShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
        mb: 3,
      }}
    >
      Why Choose Us
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      sx={{ color: "#ddd", mb: 4 }}
    >
      Discover why thousands of students trust us for reliable, high-quality notes.
    </Typography>

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      {[
        {
          title: "Verified Content",
          desc: "All notes are reviewed for accuracy and relevance by top-performing students and educators.",
        },
        {
          title: "Easy to Access",
          desc: "Download and view your notes anytime, anywhere — on any device.",
        },
        {
          title: "Free & Always Growing",
          desc: "We continuously add new material to keep up with your syllabus — all for free.",
        },
      ].map((item, idx) => (
        <Box
          key={idx}
          sx={{
            backgroundColor: "#2c2c2c",
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            border: "1px solid rgba(255, 215, 0, 0.2)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 8px 20px rgba(255, 215, 0, 0.2)",
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: "#ffd700", mb: 1 }}
          >
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            {item.desc}
          </Typography>
        </Box>
      ))}
    </Box>
  </Container>
</section>

      </Container>
    </Box>
  );
};

export default Category;
