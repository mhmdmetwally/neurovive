const multer = require('multer');


function file_filter(req,file,cb)
{

    const allowed_types=[
        'image/png',
        'image/jpeg',
        'image/jpg'
    ];


    if(allowed_types.includes(file.mimetype))
    {
        cb(null,true);
    }
    else
    {
        cb(new Error("Only image files are allowed"));
    }

}



module.exports = multer({

    storage:multer.memoryStorage(),

    fileFilter:file_filter,

    limits:{
        fileSize:5 * 1024 * 1024
    }

});