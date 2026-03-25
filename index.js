require("dotenv").config()
const express = require("express");
const { connectDB } = require("./db");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path")
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("DATABASE CONECTED");

    app.use("/", require("./routes/auth"));
    app.use("/", require("./routes/post"));
    app.use("/", require("./routes/getuser"));

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

    app.listen(PORT, () => {
      console.log("CONNECTED SERVER");
    });
  })
  .catch((err) => {
    console.log(err);
  });
