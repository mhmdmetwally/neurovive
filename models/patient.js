const { request } = require('express');
const mongoose = require('mongoose');
const { validate } = require('uuid');
const validator = require('validator');
const { array } = require('../middleware/image_hand_written');
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
    },
    patient_history:[
        {
            date_of_test:Date,
            test_type:String,
            enum:['voice','spiral','circle'],
            data:String,
            enum:['image','audio'],
            url:String
        }
    ],
    token:{
        type:String
    }
    

})

module.exports = mongoose.model(Patient,PatientSchema);