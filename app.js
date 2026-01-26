require("dotenv").config();
const express = require('express');
const app = express();

const voice_routes = require('./routes/voice_Routes');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/voice', voice_routes);

app.use((err, req, res, next) => {
    if (err.name === 'MulterError') {
        return res.status(400).json({ status: 'error', message: err.message });
    } else if (err) {
        return res.status(400).json({ status: 'error', message: err.message });
    }
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
