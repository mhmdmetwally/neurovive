const axios = require('axios');
const FormData = require('form-data');
const AI_SERVER_URL = process.env.AI_SERVER_URL_VOICE;

exports.send_toati = async (audioBuffer) => {
    const form = new FormData();

    form.append("audio", audioBuffer, {
        filename: "voice.wav",
        contentType: "audio/x-wav"
    });

    console.log("ai server"+process.env);

    const response = await axios.post(
        AI_SERVER_URL,
        form,
        {
            headers: form.getHeaders(),
            timeout: 30000,
        }
    );

    return response.data;
};
