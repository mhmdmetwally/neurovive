const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;



module.exports = async(payload)=>{

    return jwt.sign(
        {
            payload
        },
        JWT_SECRET,
        {
            expiresIn:"2w"
        }
    );

};