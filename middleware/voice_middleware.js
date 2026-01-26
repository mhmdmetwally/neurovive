const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const upload_dir = './uploads';

// إنشاء فولدر الرفع لو مش موجود
if (!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, upload_dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext);
    }
});

function file_filter(req, file, cb) {
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported audio format'));
    }
}

const upload = multer({
    storage: storage,
    fileFilter: file_filter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;
