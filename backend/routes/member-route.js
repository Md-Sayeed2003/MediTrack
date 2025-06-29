import express from 'express'
import authMiddleware from '../middleware/auth.js';
import Member from '../model/members.model.js';
import User from '../model/user.model.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/add-member',authMiddleware, async(req,res)=>{

    try { 

        const { name , age , gender , dob , relation , bloodGroup , height , weight} = req.body;

        if(!name || !age || !gender || !dob || !relation || ! bloodGroup || !height || !weight){
            return res.status(400).json({message : "All field are required"});
        }
        

       const user = req.user;

        const newMember = new Member({
            head : user._id,
            name,
            age,
            gender,
            dob,
            relation,
            bloodGroup,
            height,
            weight
        });

        await newMember.save();


        // await User.findByIdAndUpdate(user,{$push:{members : newMember._id}});

        return res.status(200).json({message : "member added successfully",newMember});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

// view member details
router.get('/member-details/:memberId',authMiddleware, async(req,res)=>{

    try {

        const {memberId} = req.params;

        const member = await Member.findById(memberId);

        if(!member){
            return res.status(404).json({message : "member not found"});
        }

        return res.status(200).json({message : "member found", member});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})


router.get('/get-all-member' ,authMiddleware , async(req,res)=>{

    try {
        
        const user = req.user;

        const data = await Member.find({head : user._id});

        if(!data){
            return res.status(400).json({message : "No member found"});
        }

        return res.status(200).json({message :"Fetched successfully",data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

router.delete('/delete-member/:id' ,authMiddleware, async(req,res)=>{

    try{

        const { id } = req.params;

        const member = await Member.findById(id);

        if(!member){
            return res.status(400).json({message : "Member not found"});
        }

        const userId = req.user._id;

        await User.findByIdAndUpdate(userId,{$pull : {members : id}});

        await member.deleteOne();

        return res.status(200).json({message : "Member removed"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

router.put('/update-member-details/:id', authMiddleware, async(req,res)=>{

    try {

        const { id }= req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : "Invalid member id"});
        }

        const updateMember = await Member.findByIdAndUpdate(id,req.body,{new : true});

        if(!updateMember){
            return res.status(400).json({message : "Member not found"});
        }

        return res.status(200).json({message : "Updated Successfully",updateMember});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message :"Internal Server Error"});
    }
})










export default router;