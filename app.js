const cors = require("cors");
const express = require("express");
const mongoose = require('mongoose');

const voice_routes = require("./routes/voice_Routes");
const image_hand_written_routes = require('./routes/image_hand_written_Routes')
const app = express();
const url = process.env.MONGO_URL;

app.use(cors());

app.use(express.json());

//connect mongo
console.log("MONGO =", process.env.MONGO_URL);
mongoose.connect(url)
    .then(() => console.log('db start'))
    .catch((err) => console.error(err));

    
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
