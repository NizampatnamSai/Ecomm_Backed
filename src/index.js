import  express  from "express";
import dotenv from 'dotenv';
import connectDB from './services/mongodb/connectDB'
dotenv.config()

import cors from 'cors'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import productRoutes from './routes/productRoutes'
console.log(process.env.DB_URL)
console.log('sfd')


const app=express()
const port=process.env.PORT ||  3003 ;

connectDB()
app.use(cors())

app.use(express.json())
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
// app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product",productRoutes)



app.listen(port, (req,res)=>{
    console.log(`server running at ${port}`)
})

// process.stdout.write("Jesus is my only saviour")