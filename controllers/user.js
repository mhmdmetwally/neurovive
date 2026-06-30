const Patient = require('../models/patient');
const bcrypt = require('bcrypt');
const gen_token = require('../utils/gen_token');

const salt_round = Number(process.env.salt_rounds);


const register = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        const cur_patient = await Patient.findOne({ user_name });

        if (cur_patient) {
            return res.status(400).json({
                status: "error",
                message: "يرجى اختيار اسم مستخدم مميز"
            });
        }

        const hashed_password = await bcrypt.hash(password, salt_round);

        const patient = new Patient({
            user_name,
            password: hashed_password
        });


        const payload = {
            id: patient._id,
            role: "patient"
        };


        const token = await gen_token(payload);

        patient.token = token;

        await patient.save();


        res.status(201).json({
            status: "success",
            data: {
                patient,
                token
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};



const login = async (req, res) => {

    try {

        const { user_name, password } = req.body;


        if (!user_name || !password) {
            return res.status(400).json({
                status:"error",
                message:"username and password are required"
            });
        }


        const cur_patient = await Patient.findOne({ user_name });


        if (!cur_patient) {
            return res.status(401).json({
                status:"error",
                message:"username or password are wrong"
            });
        }


        const matched_password = await bcrypt.compare(
            password,
            cur_patient.password
        );


        if (!matched_password) {
            return res.status(401).json({
                status:"error",
                message:"username or password are wrong"
            });
        }



        const payload = {
            id: cur_patient._id,
            role:"patient"
        };


        const token = await gen_token(payload);


        cur_patient.token = token;

        await cur_patient.save();



        res.status(200).json({
            status:"success",
            data:{
                token
            }
        });



    } catch(error){

        res.status(500).json({
            status:"error",
            message:error.message
        });

    }
};



module.exports = {
    register,
    login
};