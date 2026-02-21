const ai_service=require('../services/ai.service')
exports.analyze_voice = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'Audio file is required'
            });
        }

        const audioBuffer = req.file.buffer;

        const ai_response = await ai_service.send_toati(audioBuffer);

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
