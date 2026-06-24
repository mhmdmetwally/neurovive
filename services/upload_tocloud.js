const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloud = (file) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "patient_tests"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );

        streamifier.createStream(file.buffer).pipe(stream);
    });
};

module.exports = uploadToCloud;