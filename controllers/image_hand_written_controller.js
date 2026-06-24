const patient = require('../models/patient');
const ai_service=require('../services/image_hand_written_ai_server');
const upload_tocloud = require('../services/upload_tocloud.js');

exports.image = async(req,res)=>{
   
    try{ 
        if(!req.file)
        {
            return res.status(400).json({
                status : "error",
                messeage : "file is req"
            });
        }
        const imageBuffer=req.file.buffer;

        const ai_response = await ai_service.send_toati(imageBuffer);
        const url = await upload_tocloud(imageBuffer);
        if(req.user!=null)
        {
            patient.patient_history.push({
                test_type:req.body.test_type,
                data_type:"image",
                test_result:ai_response.probability,
                url:url
            });
        }
        return res.json({
            status:"success",
            label: ai_response.label,
            probability: ai_response.probability,
        });
    }catch(error){
            res.status(500).json({
            status: 'error',
            message: error.message || "AI processing failed"
        });
    }
}