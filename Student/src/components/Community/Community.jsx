import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { getAllProblems } from "../Api";
import AddAnswer from "./AddAnswer";
import AddProblem from "./AddProblem";
import Loader from "../Loader";

const Community = () => {
  const [textAnswer, setTextAnswer] = useState(false);
  const [problems, setProblems] = useState([]);
  const [change, setChange] = useState(false);
  const [answerCount, setAnswerCount] = useState(3);
  const [answerNum, setAnswerNum] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getAllProblems();
        setProblems(res.data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      }
      setLoading(false);
    };
    getData();
  }, [change]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        pt: 6,
        pb: 8,
        minHeight: "80vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Add Problem Input */}
      <Box mb={6}>
        <AddProblem change={change} setChange={setChange} />
      </Box>

      <Box display="flex" flexDirection="column" gap={5}>
        {problems.length === 0 && (
          <Typography
            variant="h6"
            color="rgba(255,255,255,0.7)"
            align="center"
            sx={{ fontStyle: "italic", fontSize: { xs: "1.1rem", md: "1.3rem" } }}
          >
            No problems found. Be the first to share one!
          </Typography>
        )}

        {problems.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Card
              elevation={6}
              sx={{
                borderRadius: 4,
                p: 3,
                bgcolor: "rgba(44, 83, 100, 0.85)", // subtle transparent dark blue
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                color: "#fff",
                backdropFilter: "blur(8px)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 12px 32px rgba(255, 215, 0, 0.5)",
                },
              }}
            >
              <CardContent sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
                <Typography
                  variant={isSmDown ? "h6" : "h5"}
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#ffd700",
                    letterSpacing: 1,
                  }}
                >
                  Problem:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.6,
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  {item.problem}
                </Typography>

                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={() => {
                    setAnswerNum(index);
                    setTextAnswer((prev) =>
                      answerNum === index ? !prev : true
                    );
                  }}
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: "none",
                    borderColor: "#ffd700",
                    color: "#ffd700",
                    "&:hover": {
                      backgroundColor: "rgba(255, 215, 0, 0.15)",
                      borderColor: "#ffd700",
                      color: "#fff",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {answerNum === index && textAnswer ? "Cancel" : "Add Your Answer"}
                </Button>

                {answerNum === index && textAnswer && (
                  <Box mt={2} mb={3}>
                    <AddAnswer
                      setTextAnswer={setTextAnswer}
                      change={change}
                      setChange={setChange}
                      problemId={item._id}
                      textAnswer={textAnswer}
                    />
                  </Box>
                )}

                {item.answers.length > 0 && (
                  <>
                    <Divider
                      sx={{
                        mb: 3,
                        borderColor: "rgba(255, 215, 0, 0.3)",
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: "#ffd700",
                        letterSpacing: 0.5,
                      }}
                    >
                      Answers:
                    </Typography>

                    <Box display="flex" flexDirection="column" gap={3}>
                      {item.answers.slice(0, answerCount).map((ans, ind) => (
                        <Box
                          key={ind}
                          sx={{
                            bgcolor: "rgba(255, 215, 0, 0.1)",
                            p: 2,
                            borderRadius: 3,
                            boxShadow: "0 2px 8px rgba(255, 215, 0, 0.15)",
                            color: "#fff",
                            fontSize: { xs: "0.95rem", md: "1rem" },
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(255, 215, 0, 0.2)",
                            },
                          }}
                        >
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Ans {ind + 1}:</strong> {ans.answer}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ display: "block", textAlign: "right", opacity: 0.8 }}
                          >
                            — {ans.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {item.answers.length > answerCount && (
                      <Button
                        size="small"
                        onClick={() => setAnswerCount((prev) => prev + 3)}
                        sx={{
                          mt: 3,
                          fontSize: "0.9rem",
                          textTransform: "none",
                          color: "#ffd700",
                          fontWeight: 600,
                          "&:hover": {
                            textDecoration: "underline",
                            backgroundColor: "transparent",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Show more answers
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};

export default Community;
