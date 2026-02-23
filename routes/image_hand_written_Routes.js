const express = require('express');
const router = express.Router();

const upload = require('../middleware/image_hand_written');
const image_hand_written_controller = require('../controllers/image_hand_written_controller');


router.post('/',upload.single('image'),image_hand_written_controller.image)

module.exports = router;