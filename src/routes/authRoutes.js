import express from 'express'
import User from '../services/mongodb/modules/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isAdmin from '../middlewear/isAdmin'
import {body, validationResult} from 'express-validator'
const routes= express.Router()



/*
type: GET
path: api/v1/auth/users
params: none
isProtected: true (admin)
*/

routes.get('/users',isAdmin, async(req,res)=>{

    try {
   const users= await User.find({})

   res.json({users})}
   catch (error) {
       console.log(error.message)
       res.status(500).json({users:[]})
   }
})

/*
type: POST
path: api/v1/auth/signup
params: none
isProtected: false
*/

// routes.post('/signup', async(req,res)=>{

//     try {
//         const {firstName,lastName, email, password}=req.body
        
        
     
//         const salt= await bcrypt.genSalt(5)
//         const hashedPassword= await bcrypt.hash(password, salt)
//         const user= new User ({firstName,lastName, email, password:hashedPassword, role:1})
//        console.log(hashedPassword)
//        await user.save() 
//        res.json({user})}

//         catch (error) {
//             console.log(error.message)
//             res.status(500).json({users:[]})
//         }
//      }
    
// )

routes.post('/signup',
body('firstName').isLength({min:5}),body('email').isEmail(),body('password').isLength({min:10}) ,async (req, res) => {
    const {errors}=validationResult(req)
    if(errors.length>0) return res.status(403).json({
        errors,message:"Bad request"
    })

    try {
        const { firstName, lastName = '', email, password } = req.body
        //Use bcrypt to hash password
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({ firstName, lastName, email, password: hashedPassword })

        await user.save()

        res.json({ user })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ users: {} })
    }
})
 
     /*
type: POST
path: api/v1/auth/login
params: none
isProtected: false
*/

routes.post('/login', async(req,res)=>{

    try {

        const {email, password}=req.body
        //find user
        const user= await User.findOne({email})
        console.log(user)
        if(user)
        {
            
            const isVerfied= await bcrypt.compare(password, user.password)
            if(isVerfied){
                console.log(user)
            const {_id,role}=user
            const token= jwt.sign({_id, role},process.env.JWT_SECRET, {expiresIn:'1h'})
            return res.json({token})}
            else {
                return res.json({token:null, messsage:"Unotharised"})
            }
        }
        res.json({token:null, message:"User does'not exist"})
    
    
      }
        catch (error) {
            console.log(error.message)
            res.status(500).json({token:null})
        }
     }
    
 )

export default routes