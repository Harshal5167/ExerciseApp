const mongoose=require('mongoose')
const validator =require('validator')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:[true,'Username already in use']
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email is already present'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

//generating token
userSchema.methods.generateToken= function(){
    try{
        return jwt.sign({_id:this._id}, process.env.JWT_KEY,{
            expiresIn:"1d",
        })
    }catch(err){
        console.log(err);
    }
}

//password matching
userSchema.methods.checkPassword=async function(password){
    try{
        return await bcrypt.compare(password,this.password)
    }catch(err){
        console.log(err);
    }
}

//password hashing
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})

module.exports=new mongoose.model('user',userSchema)