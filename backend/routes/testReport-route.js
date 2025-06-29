import express from 'express'
import TestReport from '../model/test-report.model.js';
import Member from '../model/members.model.js';
import { v2 as cloudinary} from 'cloudinary';
import authMiddleware from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();


router.post('/add-test-report/:memberId', authMiddleware ,  async(req,res)=>{

    try {

        const { memberId } = req.params;

        const { image } = req.files;

        if(!image){
            return res.status(400).json({message : "Image required"});
        }

        const { doctorName ,date , disease , details ,  } = req.body;

        if(!doctorName || !date || !disease || !details){
            return res.status(400).json({message : "All fields are required"});
        }

        const cloudinaryResponse = await cloudinary.uploader.upload( image.tempFilePath );

        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error);
        }

        const memberData = await Member.findById(memberId);

        const data = new TestReport({
            headMember : req.user._id,
            memberName : memberData.name,    // 
            memberAge : memberData.age,  //
            memberRelation : memberData.relation, //
            doctorName,
            date,
            disease,
            details,
            image :{
                public_id : cloudinaryResponse.public_id,
                url : cloudinaryResponse.url
            }
        });

        await data.save();

        return res.status(200).json({message : "Data added Successfully", data});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
});

router.get('/get-test-report/:id' , authMiddleware, async(req,res)=>{

    try {
        
        const {id} = req.params;

        if(!id){
            return res.status(400).json({message : "test report id required"});
        }

        const data = await TestReport.findById(id);

        if(!data){
            return res.status(400).json({message : "No data found"});
        }

        return res.status(200).json({message : "Data fetched successfully",data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

router.post('/delete-test-report' , authMiddleware , async(req,res)=>{

    try {

        const { memberId , reportId } = req.body;

        if(!mongoose.Types.ObjectId.isValid(memberId)){
            return res.status(400).json({message : " valid member id required"});
        }

        if(!mongoose.Types.ObjectId.isValid(reportId)){
            return res.status(400).json({message : " valid test report id required"});
        }

        await Member.findByIdAndUpdate(memberId, {$pull : {testReport : reportId}});

        await TestReport.findByIdAndDelete(reportId);
        
        return res.status(200).json({message : "Removed Successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

router.put('/update-test-report/:id', authMiddleware , async(req,res)=>{

    try {

        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : "Valid Id required"});
        }

        const updatedData = await TestReport.findByIdAndUpdate(id,req.body, {new : true});

        if(!updatedData){
            return res.status(400).json({message : "No data found"});
        }

        return res.status(200).json({message : "Updated Successfully",updatedData});


    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})


//get all testReport

router.get('/get-all-test-report', authMiddleware , async(req,res)=>{

    try {

        const userId = req.user._id;

        const data = await TestReport.find({headMember : userId});

        if(!data){
            return res.status(400).json({message : "No data found"});
        }

        return res.status(200).json({message : "Data fetched ",data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
});



export default router;