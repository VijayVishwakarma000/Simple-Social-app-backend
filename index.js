require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://inquisitive-bonbon-f30eec.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false,
  })
);

app.use(express.json());

app.use("/image/uploads", express.static(path.join(__dirname, "uploads")));

connectDB()
  .then(() => {
    console.log(" DATABASE CONNECTED");

    app.use("/", require("./routes/auth"));
    app.use("/", require("./routes/post"));
    app.use("/", require("./routes/getuser"));

    app.get("/", (req, res) => {
      res.send("serving running test command ");
    });

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" DB ERROR:", err);
    process.exit(1); 
  });

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE:", err);
});
