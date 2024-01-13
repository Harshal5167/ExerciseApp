const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const userModel = require('../models/user');
dotenv.config()

const auth=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({"error":"No token provided"})
        }
        const verify=jwt.verify(token,process.env.JWT_KEY)
        const user=await userModel.findById(verify._id)
        if(!user){
            return res.status(401).json({"error":"User not found"})
        }
        req.body.user=user
        next()
    }catch(err){
        console.log(err);
        res.status(400).json({error:err})
    }
}

module.exports=auth