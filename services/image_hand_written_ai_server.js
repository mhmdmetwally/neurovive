const axios=require('axios');
const formData=require('form-data');
const AI_SERVER_URL=process.env.AI_SERVER_URL_IMAGE_HANDWRITTEN
exports.send_toati = async(imageBuffer)=>{
    form=new formData();

    form.append('image',imageBuffer,{
        filename:'image.jpg',
        contentType:'image.jpeg'
    });

    const response = await axios.post(
        AI_SERVER_URL,
        form,
        {
            headers: form.getHeaders(),
            timeout: 30000,
        },
    );
    return response.data;
}