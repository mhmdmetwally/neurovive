require("dotenv").config();
const cors = require("cors");
const express = require("express");

const voice_routes = require("./routes/voice_Routes");
const image_hand_written_routes = require('./routes/image_hand_written_Routes')
const app = express();

app.use(cors());

app.use(express.json());

// Routes

app.use("/voice", voice_routes);

app.use("/image",image_hand_written_routes);

 app.get("/", (req, res) => {
  res.json({ message: "Neurovive API is running 🚀" });
});


// Global Error Handler (Multer + others)
app.use((err, req, res, next) => {
    if (err.name === "MulterError") {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }

    if (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }

    next();
});

module.exports = app;
