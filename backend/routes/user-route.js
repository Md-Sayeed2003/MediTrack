import express from 'express'
import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import authMiddleware from '../middleware/auth.js'


const router = express.Router();
 

router.post('/sign-up', async(req,res)=>{

    try{ 

        const {username , email , password ,age , dob , bloodGroup , height ,weight} = req.body;

        if(!username || !email || !password || !age || !dob || !bloodGroup || !height || !weight){
            return res.status(400).json({message : "All fields are required"});
        }

        if(username.length < 5){
            return res.status(400).json({message : "Username must have 5 characters"});
        }

        if(password.length < 6){
            return res.status(400).json({message : "password must have 6 characters"});
        }

        const existEmail = await User.findOne({email : email});

        if(existEmail){
            return res.status(400).json({message : "User already exists with this email"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username : username,
            password : hashedPassword,
            email : email,
            age,
            dob,
            bloodGroup,
            height,
            weight
        });

        await newUser.save();
        
        return res.status(200).json({message : "Account Created",newUser});


    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
        
    }
}); 

router.post('/login',async(req,res)=>{

    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        const existEmail = await User.findOne({email : email});

        if(!existEmail){
            return res.status(400).json({message : "Invalid Credentails"});
        }

        const checkPassword = await bcrypt.compare(password,existEmail.password);

        if(!checkPassword){
            return res.status(400).json({message : "Invalid Credentails"});
        }

        const token = jwt.sign(
            {id : existEmail._id,email : existEmail.email},
            process.env.JWT_SECRET,
            {expiresIn:"30d"}
        );

        res.cookie("userToken",token,{
            httpOnly : true,
            maxAge : 30 * 24 * 60 * 60 * 100,
            sameSite : "None",
            secure : process.env.NODE_ENV === "production"
        });

        return res.status(200).json({
            id : existEmail._id,
            username : existEmail.username,
            email : email,
            message : "User LoggedIn Successfully"
        });



    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
        
    }
})

router.get('/logout', (req,res)=>{

    try{

        res.clearCookie("userToken",{
            httpOnly : true
        });

        return res.status(200).json({message : "Logout Successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }

})

router.get('/check-cookie',(req,res)=>{

    try{

        const token = req.cookies.userToken;

        if(token){
            return res.status(200).json({message : true});
        }

        return res.status(200).json({message : false});

    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }
});
 
router.get('/user-details',authMiddleware, async(req,res)=>{
    try {

        const {email} = req.user;

        const existingUser = await User.findOne({email:email}).select("-password");

        if(!existingUser){
            return res.status(404).json({message : "User not found"});
        }

        return res.status(200).json({message : "Successfull",user : existingUser});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

 
export default router;