const axios = require('axios');
const FormData = require('form-data');
const AI_SERVER_URL = process.env.AI_SERVER_URL;

exports.send_toati = async (audioBuffer) => {
    const form = new FormData();

    form.append("audio", audioBuffer, {
        filename: "voice.mp3",
        contentType: "audio/mpeg"
    });

    const response = await axios.post(
        AI_SERVER_URL,
        form,
        {
            headers: form.getHeaders(),
            maxBodyLength: Infinity
        }
    );

    return response.data;
};
