const express = require('express');
const router = express.Router();

const upload = require('../middleware/voice_middleware');
const voice_controller = require('../controllers/voice_controller');

router.post('/', upload.single('voice'), voice_controller.analyze_voice);

module.exports = router;
