const axios = require('axios');
const form_data = require("form-data");
const fs = require ("fs");
const AI_SERVER_URL = process.env.AI_SERVER_URL;

exports.send_toati = async(audio_path)=>{
    const form = new form_data();
    form.append("audio",fs.createReadStream(audio_path));

    const response = await axios.post(
        //ai server url
       AI_SERVER_URL,
        form,
        {
            headers:form.getHeaders()
        }
    );
    return response.data;
}