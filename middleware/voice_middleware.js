const multer = require('multer');

function file_filter(req, file, cb) {
    const allowedTypes = [
        'audio/mpeg',
         'audio/wav',
          'audio/mp3', 
         'audio/x-wav'
    ]
    ;
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported audio format'));
    }
}

const upload = multer({
    storage: multer.memoryStorage(), 
    fileFilter: file_filter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;
