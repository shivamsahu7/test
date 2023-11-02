const User = require('../models/user.js')
const generateOtp = require('generate-otp')
const jwt = require('jsonwebtoken');
const {handleApiError,handleApiSuccess} = require('./../helper/reponse.js')

const registerCustomer = async (req,res)=>{
    try{
        const otp = generateOtp.generate(5)
        const user = await User.findOneAndUpdate({
            number:req.body.number,verifiedAt:false
        },{
            $set:{
                number:req.body.number,
                'otp.value':otp,
                'otp.attempt':5
            }
        },{ 
            upsert: true, new: true 
        })
        const data = {
            user,otp
        }
        return handleApiSuccess(req,res,data,"Otp has been sent",200)
    }catch(error){
        return handleApiError(req,res,{},"Internal server error",500)
    }
}

const loginCustomer = async (req,res)=>{
    try{
        const otp = generateOtp.generate(5)
        const user = await User.findOneAndUpdate({
            number:req.body.number,verifiedAt:true
        },{
            $set:{
                number:req.body.number,
                'otp.value':otp,
                'otp.attempt':5
            }
        },{ 
            upsert: true, new: true 
        })
        const data = {
            user,otp
        }
        return handleApiSuccess(req,res,data,"Otp has been sent",200)
    }catch(error){
        return handleApiError(req,res,{},"Internal server error",500)
    }
}

const otpVerify = async(req,res)=>{
    try{
        const user = await User.findOne({number:req.body.number})

        if(user.otp.attempt >= 1){
            if(user.otp.value == req.body.otp){
                user.otp.attempt = 0
                user.otp.value = null
                await user.save()

                // create token 
                let tokenExp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // token valid for 1 year
                let token = jwt.sign({
                    userId: user._id,
                    exp: tokenExp,
                }, 
                    process.env.JWT_SECRET_KEY
                );

                return handleApiSuccess(req,res,{user,token},"Login successfully",200)
            }else{
                user.otp.attempt = user.otp.attempt - 1
                await user.save()
                return handleApiError(req,res,{},"wrong otp",500)
            }
        }
        return handleApiError(req,res,{},"You have tried many attempts",500)
    }catch(error){
        console.log(error)
        return handleApiError(req,res,{},"Internal server error",500)
    }
}

const updateProfile =  async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.userId})
        if(req.body.name){
            user.name = req.body.name
        }
        if(req.body.email){
            user.email = req.body.email
        }
        if(req.body.address){
            user.address = req.body.address
        }
        await user.save()
        return handleApiSuccess(req,res,{user},"Login successfully",200)
    }catch(error){
        console.log(error)
        return handleApiError(req,res,{},"Internal server error",500)
    }
}

module.exports = {
    registerCustomer,
    loginCustomer,
    otpVerify,
    updateProfile
}