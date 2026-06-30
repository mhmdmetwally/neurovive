const cloudinary=require("../config/cloudinary");
const streamifier=require("streamifier");


const uploadToCloud=(file)=>{


return new Promise((resolve,reject)=>{


const stream =
cloudinary.uploader.upload_stream(

{
folder:"patient_tests",
resource_type:"auto"
},


(error,result)=>{


if(error)
reject(error);

else
resolve(result.secure_url);


}

);



streamifier
.createReadStream(file.buffer)
.pipe(stream);



});


};



module.exports=uploadToCloud;