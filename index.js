require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://inquisitive-bonbon-f30eec.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.get("/image/uploads/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("image not found");
  }

  const filePath = path.join(__dirname, "uploads", id);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("image url not found");
  }

  return res.sendFile(filePath);
});

async function startServer() {
  try {
    app.use("/", require("./routes/auth"));
    app.use("/", require("./routes/post"));
    app.use("/", require("./routes/getuser"));

    app.get("/", (req, res) => {
      res.send("API running");
    });

    app.listen(PORT, () => {
      console.log(`  Server running on port ${PORT}`);
    });

    connectDB()
      .then(() => console.log("  DATABASE CONNECTED"))
      .catch((err) => console.error("❌ DB ERROR:", err));

  } catch (err) {
    console.error("FATAL ERROR:", err);
  }
}

startServer();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE:", err);
});
