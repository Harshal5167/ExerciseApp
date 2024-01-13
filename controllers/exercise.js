const exerciseModel=require('../models/exercise')

const getExercises=async(req,res)=>{
    try{
        const getExercises=await exerciseModel.find()
        res.status(200).json(getExercises)
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"internal server error"
        })
    }
}

const addExercise=async(req,res)=>{
    try{
        const {username,description,date,duration}=req.body
        const newExercise=new exerciseModel({username,description,date,duration})
        const createExercise=await newExercise.save()
        res.status(200).json(createExercise)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}

const getExerciseById=async(req,res)=>{
    const {id}=req.params
    try{
        const exercise=await exerciseModel.findById(id)
        res.status(200).json(exercise)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}

const deleteExercise=async(req,res)=>{
    const {id}=req.params
    try{
        const deleteExerciseById=await exerciseModel.findByIdAndDelete(id)
        res.status(200).json(deleteExerciseById)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}

const updateExercise=async(req,res)=>{
    const {id}=req.params
    const updates=req.body
    try{
        const updateExercise=await exerciseModel.findByIdAndUpdate(id,updates)
        res.status(200).json(updateExercise)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}


module.exports={
    getExercises,
    addExercise,
    getExerciseById,
    deleteExercise,
    updateExercise
}
