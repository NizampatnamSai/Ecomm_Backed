import  express  from "express";
import dotenv from 'dotenv';
import connectDB from './services/mongodb/connectDB'
dotenv.config()

console.log(process.env.DB_URL)
const app=express()
const port=process.env.PORT ||  3003 ;

connectDB()

app.listen(port, (req,res)=>{
    console.log(`server running at ${port}`)
})

// process.stdout.write("Jesus is my only saviour")