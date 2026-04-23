const { request } = require('express');
const mongoose = require('mongoose');
const { validate } = require('uuid');
const validator = require('validator');
const PatientSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:[
            (value)=>validator.isLength(
                value,{min:3, max:40}
            ),
            "40 الاسم على الأقل 3 احرف وعلى الأكثر"
       ]
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return validator.isStrongPassword(value,{
                    minLength:8,
                    minLowercase:1,
                    minNumbers:1  
                });
            },
            message:'كلمة المرور ضعيفة! يجب أن تحتوي على 8 أحرف تشمل (حرف كبير، حرف صغير، رقم، ورمز)'
        }
    }
})

module.exports = mongoose.model(Patient,PatientSchema);