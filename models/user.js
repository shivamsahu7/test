const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique: true, 
        index: true
    },
    number:{
        type:Number,
        unique: true, 
        index: true
    },
    address:{
        type:String
    },
    verifiedAt:{
        type:Boolean,
        default:false
    },
    otp:{
        value:{
            type:Number
        },
        attempt:{
            type:Number
        }
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User