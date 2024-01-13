const express = require('express')
const exercise=require('./routes/exercise')
const dotenv = require('dotenv')
const user=require('./routes/user')
const auth=require('./routes/auth')
const cookieParser=require('cookie-parser')
require('./dbConnect')
dotenv.config()

const app=express()
const port=process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())

app.use('/api/exercise', exercise)
app.use('/api/user',user)
app.use('/api/auth',auth)
app.use('*',(req,res)=>{
    res.status(404).json({error:"not found"})
})

app.listen(port,()=>{
    console.log(`connected at ${port}`);
})

