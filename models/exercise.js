const mongoose=require('mongoose')

const exerciseSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

module.exports=new mongoose.model('exercise',exerciseSchema)