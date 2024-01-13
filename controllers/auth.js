const userModel=require('../models/user')

const signup=async(req,res)=>{
    try{
        const newUser=new userModel(req.body)
        const createUser=await newUser.save()

        const token=createUser.generateToken()
        res.cookie("jwt",token,{
            httpOnly: true,
            secure:true
        })
        res.status(200).json({
            msg:"registered successfully",
            "token":token
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}

const logout=async(req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(200).json({
            msg:"logged out successfully",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}

const login=async(req,res)=>{
    try{
        const {username,password}=req.body
        const user=await userModel.findOne({username})
        if(!user){
            return res.status(400).json({error:"user not found pls register first"})
        }

        const isValid=await user.checkPassword(password)
        if(!isValid){
            return res.status(400).json({error:"password incorrect"})
        }

        const token=await user.generateToken()
        res.cookie("jwt",token,{
            httpOnly:true,
            secure:true,
        })
        res.status(200).json({
            msg:"logged in successfully",
            "token":token
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}

module.exports={
    login,
    logout,
    signup
}
