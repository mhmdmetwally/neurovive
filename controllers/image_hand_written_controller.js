const Patient = require('../models/patient');
const ai_service=require('../services/image_hand_written_ai_server');
const upload_to_cloud=require('../services/upload_tocloud');


exports.image = async(req,res)=>{


try{


if(!req.file)
{
return res.status(400).json({
status:"error",
message:"file is required"
});
}



const imageBuffer=req.file.buffer;



const ai_response =
await ai_service.send_toati(imageBuffer);



const url =
await upload_to_cloud(req.file);



if(req.user)
{


await Patient.findByIdAndUpdate(

req.user.id,

{

$push:{
patient_history:{

test_type:req.body.test_type || "spiral",

data_type:"image",

test_result:ai_response.probability,

url:url

}

}

}

);

}



res.json({

status:"success",

label:ai_response.label,

probability:ai_response.probability

});



}catch(error){


res.status(500).json({

status:"error",

message:error.message

});


}

};