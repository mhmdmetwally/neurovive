const multer = require('multer');

function file_filter (req,file,cb)
{
    const allowed_types=['jpg'];
    if(allowed_types.includes(file.mimetype))
        cb(null,false);
    else
        cb(null,true);
}

module.exports = multer({
    storage:multer.memoryStorage(),
    fileFilter:file_filter
});
