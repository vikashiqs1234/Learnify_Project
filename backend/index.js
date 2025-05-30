const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { dbConnection } = require("./Db");
const Router = require("./routes/routes");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(
  cors()
);
// app.use(cors({
//   origin:['https://student-study-website.vercel.app'],
//   methods:["POST","GET"],
//   credentials:true,
//   optionsSuccessStatus: 200,
// }));
app.use(cookieParser());
app.use(express.json());
app.use('/',Router)
dbConnection();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
