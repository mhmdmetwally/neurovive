const jwt=require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;
const verify_token=(req,res,next)=>{

    const auth_header=req.headers["Authorization"] || req.headers["authorization"];
    if(!auth_header)
    {
        //as a guest
        req.user = null;
        return next();
    }
    const token = auth_header.split(' ')[1];
    try {
        const decoded_token= jwt.verify(token,JWT_SECRET);    
        req.user=decoded_token.payload;
        next();
    } catch (error) {
        //as a guest
        req.user = null;
        next();
    }
}
module.exports = verify_token ;