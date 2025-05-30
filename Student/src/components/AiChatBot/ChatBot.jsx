import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton, Paper, CircularProgress } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import googleGeminiService from "../configGemini/gemini";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import load from "../../assets/loader.gif";

const ChatBot = () => {
  const [problem, setProblem] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loader, setLoader] = useState(false);

  const delayRes = (ind, word) => {
    setTimeout(() => {
      setResponse((prev) => prev + word);
    }, 75 * ind);
  };

  const formatCode = (codeString) =>
    codeString.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setProblem(question);
    setResponse("");
    setLoader(true);

    try {
      const result = await googleGeminiService.generateContent(question);
      setLoader(false);
      const formattedResult = formatCode(result.candidates[0].content.parts[0].text);
      const words = formattedResult.split(" ");
      for (let i = 0; i < words.length; i++) {
        delayRes(i, words[i] + " ");
      }
    } catch (error) {
      setLoader(false);
      alert(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (response) {
      Prism.highlightAll();
    }
  }, [response]);

  return (
    <Paper elevation={6} sx={{ maxWidth: 720, mx: "auto", my: 4, p: 3, bgcolor: "#1e1e2f", color: "#e0e0e0", height: "80vh", display: "flex", flexDirection: "column", borderRadius: 3 }}>
      <Box sx={{ flex: 1, overflowY: "auto", pr: 2, mb: 2 }}>
        {problem ? (
          <Box sx={{ bgcolor: "#6c63ff", px: 2, py: 1.5, borderRadius: 4, mb: 2, maxWidth: "80%", boxShadow: 4 }}>
            <Typography fontWeight={600} fontSize={18} color="#fff">
              {problem}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h5" align="center" color="#a3a3ff" mt={5}>
            Welcome! I am Your AI Assistant
          </Typography>
        )}

        {loader ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <img src={load} alt="Loading..." width={60} height={60} />
          </Box>
        ) : (
          <Box sx={{ bgcolor: "#2a2a3d", borderRadius: 2, p: 2, boxShadow: "inset 0 0 10px #3b3b5c", maxHeight: "50vh", overflowY: "auto", whiteSpace: "pre-wrap" }}>
            {response ? (
              <pre>
                <code className="language-javascript">{response}</code>
              </pre>
            ) : (
              <Typography align="center" color="#8888aa" mt={4} fontStyle="italic">
                Hello, I am your AI Assistant. How can I help you?
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <Box display="flex" alignItems="center" gap={2} borderTop={"1px solid #3b3b5c"} pt={2}>
        <TextField
          variant="outlined"
          placeholder="Enter your problem..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
          sx={{
            input: {
              bgcolor: "#12121f",
              color: "#e0e0e0",
              px: 2,
              py: 1,
              borderRadius: 5,
              boxShadow: "inset 0 0 8px #3b3b5c",
              "&::placeholder": { color: "#6c6c8c" },
            },
            fieldset: { border: "none" },
          }}
        />
        <IconButton
          sx={{ bgcolor: "#6c63ff", color: "white", borderRadius: "50%", p: 1.25, transition: "all 0.3s ease" }}
          onClick={handleSubmit}
        >
          <IoMdSend size={26} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatBot;
