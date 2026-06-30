const Patient=require('../models/patient');
const ai_service=require('../services/voice_ai_server');
const upload_to_cloud=require('../services/upload_tocloud');



exports.analyze_voice=async(req,res)=>{


try{


if(!req.file)
{
return res.status(400).json({
status:"error",
message:"Audio file is required"
});
}



const audioBuffer=req.file.buffer;



const url =
await upload_to_cloud(req.file);



const ai_response =
await ai_service.send_toati(audioBuffer);



if(req.user)
{

await Patient.findByIdAndUpdate(

req.user.id,

{

$push:{
patient_history:{

test_type:"voice",

data_type:"audio",

test_result:ai_response.probability,

url

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