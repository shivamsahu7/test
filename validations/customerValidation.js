const {check,body} = require('express-validator')
const User = require('../models/user')
registerValidationRules = [
    body('number').custom(async(number)=>{
        if(!/^[0-9]{10}$/.test(number)){
            throw new Error('Mobile number must be a 10-digit number')
        }
        const userCount = await User.countDocuments({number,verifiedAt:true})
        if(userCount >= 1){
            throw new Error('allready registered')
        }
        return true;
    })
]

loginValidationRules = [
    body('number').custom(async(number)=>{
        if(!/^[0-9]{10}$/.test(number)){
            throw new Error('Mobile number must be a 10-digit number')
        }
        const userCount = await User.countDocuments({number,verifiedAt:true})
        if(userCount <= 0){
            throw new Error('user is not registered')
        }
        return true;
    })
]

otpValidationRules = [
    body('number').custom(async(number)=>{
        if(!/^[0-9]{10}$/.test(number)){
            throw new Error('Mobile number must be a 10-digit number')
        }
        const userCount = await User.countDocuments({number})
        if(userCount <= 0){
            throw new Error('number is not valid')
        }
        return true;
    }),
    body('otp').custom(async(otp)=>{
        if(!/^[0-9]{5}$/.test(otp)){
            throw new Error('otp must be a 5-digit number')
        }
        return true
    })
]

updateProfileValidationRules =[
    body('name').optional().isString().withMessage('value must be string'),
    body('email').optional().isEmail().withMessage('Email is invalid'),
    body('address').optional().isString().withMessage('value must be string')
]

module.exports = {
    registerValidationRules,
    loginValidationRules,
    otpValidationRules,
    updateProfileValidationRules
}