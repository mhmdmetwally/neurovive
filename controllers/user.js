const express = require('express');
const Patient = require('../models/patient');
const bcrypt = require('bcrypt');
const patient = require('../models/patient');
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

const login = (req,res)=>{
    const {user_name,password}=req.body;
    if(!user_name || !password)
    {
        return res.status(404).json({
            status:"error",
            message:"user_name and password are required"
        })
    }
    const cur_patient = await Patient.findOne({user_name:user_name});
    if(!cur_patient){
        return res.status(404).json({
            status:'error',
            messege :'user_name or password are wrong'
        });
    }
    const matched_password = await.bcrypt.compare(password,cur_patient.password);
    if(!cur_patient || !matched_password)
    {
        return res.status(404).json({
            status:'error',
            messege :'user_name or password are wrong'
        });
    }

    //gen_token
    const payload = {
        id:patient._id,
        role:'patient'
    }

    const token = await gen_token(payload);
    patient.token=token
    return res.status(200).json({
        status:success,
        data:{
            token:patient.token
        }
    });
}


module.exports = {
    register,
    login
}
