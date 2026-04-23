const express = require('express');
const Patient = require('../models/patient');
const bcrypt = require('bcrypt');
const salt_round = Number(process.env.salt_rounds);

const register = (req,res)=>{
    const {user_name,password}=req.body;
    const cur_patient = await Patient.findOne({user_name:user_name});
    if(cur_patient){
        return res.status(404).json({
            status:'error',
            messege :'يرجي اختيار اسم مستخدم مميز'
        
        });
    }
    const hashed_pass = await.bcrypt.hash(password,salt_round);
    const patient = new Patient({
        user_name,
        password:hased_password
    });

    //get token
    const payload = {
        id:patient._id,
        role:'patient'
    }

    const token = await gen_token(payload);
    patient.token=token

    //save new patient
    await patient.save();
    res.status(201).json({
        status:'success',
        data:{patient:patient}
    });
}
