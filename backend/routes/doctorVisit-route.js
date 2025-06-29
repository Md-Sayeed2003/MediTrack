import express from 'express';
import {v2 as cloudinary} from 'cloudinary'
import DoctorVisit from '../model/doctor-visit.model.js';
import Member from '../model/members.model.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/add-doctorVisit/:memberId', authMiddleware, async(req,res)=>{

    try {
 
        const { memberId } = req.params;

        const { image } = req.files;

        if(!image){
            return res.status(400).json({message : "Image is required"});
        }

        const { doctorName , date , disease , symptoms , recommendation ,  }= req.body;

        if(!doctorName || !date || !disease || !symptoms || !recommendation){
            return res.status(400).json({message : "All field are required"});
        }

        const cloudinaryResponse = await cloudinary.uploader.upload( image.tempFilePath );

        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error);
        }

        const memberData = await Member.findById(memberId);
        // console.log(memberData)

        const data = new DoctorVisit({
            headMember : req.user._id,
            memberName : memberData.name,
            memberAge : memberData.age,
            memberRelation : memberData.relation,
            doctorName,
            date,
            disease,
            symptoms,
            recommendation,
            image :{
                public_id : cloudinaryResponse.public_id,
                url : cloudinaryResponse.url
            }
        });

        await data.save();

        return res.status(200).json({message : "Data added Successfully", data});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }
})

router.post('/delete-doctorVisit',authMiddleware, async(req,res)=>{

    try {

        const { visitId } = req.body;

        // if(!visitId){
        //     return res.status(400).json({message : "DoctorVisit Id is required"});
        // }

        await DoctorVisit.findByIdAndDelete(visitId);

        return res.status(200).json({message : "Deleted Successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }
})


router.get('/get-doctorVisit/:id' , authMiddleware, async(req,res)=>{

    try {

        const { id } = req.params;

        if(!id){
            return res.status(400).json({message : "doctor visit id required"});
        }

        const data = await DoctorVisit.findById(id);

        if(!data){
            return res.status(400).json({message : "No data found"});
        }

        return res.status(200).json({message : "Data fetched successfully",data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }
})


router.put('/update-doctorVisit/:id', authMiddleware , async(req,res)=>{

    try {

        const { id } = req.params;

        if(!id){
            return res.status(400).json({message : "Id required"});
        }

        const updatedData = await DoctorVisit.findByIdAndUpdate(id,req.body, {new : true});

        if(!updatedData){
            return res.status(400).json({message : "Data not found"});
        }

        return res.status(200).json({message: "Updated Successfully",updatedData});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }
});

//get all user members doctorVisit
router.get('/get-all-doctorVisit', authMiddleware , async(req,res)=>{

    try {

        const userId = req.user._id;

        const data = await DoctorVisit.find({headMember : userId});

        if(!data){
            return res.status(400).json({message : "No Data found"});
        }

        return res.status(200).json({message : "Fetched successfully",data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }
})

export default router;