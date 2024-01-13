const userModel=require('../models/user')

const getUsers=async(req,res)=>{
    try{
        const getUsers=await userModel.find()
        res.status(200).json(getUsers)
    }catch(err){
        console.log(err);
        res.status(400).send('Error')
    }
}

module.exports={
    getUsers
}
