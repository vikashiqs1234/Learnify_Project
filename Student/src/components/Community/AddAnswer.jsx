import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { addAnswer } from "../Api";

const AddAnswer = ({ textAnswer, setTextAnswer, setChange, change, problemId }) => {
  const [formData, setFormData] = useState({});

  const handleAnswer = async (e) => {
    e.preventDefault();
    formData.problemId = problemId;
    try {
      const res = await addAnswer(formData);
      console.log(res);
      setChange(!change);
      setTextAnswer(false);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    textAnswer && (
      <Box
        component="form"
        onSubmit={handleAnswer}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <TextField
          variant="outlined"
          label="Your Name"
          name="name"
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            style: { color: "#ffd700" },
          }}
          InputProps={{
            style: {
              color: "#fff",
              borderColor: "#ffd700",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffd700",
              },
              "&:hover fieldset": {
                borderColor: "#ffd700",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffd700",
              },
            },
          }}
        />

        <TextField
          variant="outlined"
          label="Enter Answer Here"
          name="answer"
          onChange={handleChange}
          fullWidth
          multiline
          rows={5}
          InputLabelProps={{
            style: { color: "#ffd700" },
          }}
          InputProps={{
            style: {
              color: "#fff",
              borderColor: "#ffd700",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffd700",
              },
              "&:hover fieldset": {
                borderColor: "#ffd700",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffd700",
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            alignSelf: "flex-start",
            px: 4,
            py: 1.5,
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "#ffd700",
            color: "#000",
            borderRadius: 3,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#e6c200",
              color: "#000",
            },
            transition: "all 0.3s ease",
          }}
        >
          Submit
        </Button>
      </Box>
    )
  );
};

export default AddAnswer;
