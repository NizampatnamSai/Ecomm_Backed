import  mongoose  from "mongoose";



const connectDB= async()=>{
const connectionString=process.env.DB_URL

try {
    mongoose.connect(connectionString)
    console.log('COnntecte to DB !!')
} catch (error) {
    console.log(` Some error occured ${error.messaage}`)
}}

export default connectDB