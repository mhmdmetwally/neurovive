const patient = require('../models/patient');
const ai_service=require('../services/voice_ai_server')
const upload_tocloud =require('../services/upload_tocloud');
exports.analyze_voice = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'Audio file is required'
            });
        }

        const audioBuffer = req.file.buffer;
        //to colud
        const url = await upload_tocloud(audioBuffer);
       
        const ai_response = await ai_service.send_toati(audioBuffer);
       
        if(req.user!=null)
        {
            patient.patient_history.push({
                test_type:"voice",
                data_type:"audio",
                test_result:ai_response.probability,
                 url:url
            })
        }
        
        res.json({
            status: "success",
            label: ai_response.label,
            probability: ai_response.probability,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message || "AI processing failed"
        });
    }
};
