const mongoose=require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

const dataBaseURI=process.env.dataBaseURI

const connectDB=async()=>{
    try{
        await mongoose.connect(dataBaseURI)
        console.log('Connected to Db');
    }catch(err){
        console.log(err);
    }    
}
connectDB()