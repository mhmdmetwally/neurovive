const ai_service=require('../services/image_hand_written_ai_server')
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