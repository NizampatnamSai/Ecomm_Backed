import  mongoose  from "mongoose";

const ReviewSchema= new mongoose.Schema({
    authorName:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})

const Review= mongoose.model('Review',ReviewSchema)

export default Review;