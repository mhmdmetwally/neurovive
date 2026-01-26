const path=require('path');
const fs=require('fs');
const {v4:uuidv4}=require('uuid');
const { error } = require('console');
const ai_service = require('../services/ai.service');
exports.analyze_voice = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                status:'error',
                messege:'Audio file is required'
            });
        }
        const audio_path=req.file.path;

        //send to ai

        const ai_response = await ai_service.send_toati(audio_path);

        //delete temp file

        fs.unlink(audio_path, (err) => {
            if (err) {
                console.error("Failed to delete temp file:", err);
            }
        });

        res.json({
            status: "success",
            prediction: ai_response.prediction,
            confidence: ai_response.confidence,
        });
    }
    catch(error){
        res.json({
            status:'error',
            messege:error
        })
    }
};