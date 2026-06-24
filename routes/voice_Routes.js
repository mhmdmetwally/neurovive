const express = require('express');
const router = express.Router();

const upload = require('../middleware/voice_middleware');
const voice_controller = require('../controllers/voice_controller');
const verify_token = require('../middleware/verify_token');

router.post('/', verify_token,upload.single('voice'), voice_controller.analyze_voice);

module.exports = router;
