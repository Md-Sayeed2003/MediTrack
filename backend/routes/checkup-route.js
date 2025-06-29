import express from 'express'
import Member from '../model/members.model.js';
import RegularCheckup from '../model/regular-checkup.model.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/add-regular-checkup/:id',authMiddleware, async(req,res)=>{

    // changed the getting id from req,params to req.body
    try {

        const  {id}  = req.params;

        

        const { date,bp,sl_fasting,sl_random,sl_pp,bodyTemp,spo2,heartRate,colestrolLevel,weight,bmi,sleepDuration,} = req.body;

        if(!date || !bp || !sl_fasting || !sl_pp || !sl_random || !bodyTemp || !spo2 || !heartRate || !colestrolLevel || !weight || !bmi || !sleepDuration){
            return res.status(400).json({message : "All fields are required"});
        }

        if(!id){
            return res.status(400).json({message : "member id is required"});
        }

        const memberData = await Member.findById(id);


        const data = new RegularCheckup({
            headMember : req.user._id,
            memberName : memberData.name,
            memberAge : memberData.age,
            memberRelation : memberData.relation,
            date,
            bp,
            sugarLevel :{
                fasting : sl_fasting,
                random : sl_random,
                pp : sl_pp
            },
            bodyTemp,
            spo2,
            heartRate,
            colestrolLevel,
            weight,
            bmi,
            sleepDuration
        });

        await data.save();


        return res.status(200).json({message : "Data added Successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }
})


router.get('/get-regular-checkup/:id',authMiddleware, async(req,res)=>{

    try {

        const { id } = req.params;

        if(!id){
            return res.status(400).json({message : "regular checkup id required"})
        }

        const data = await RegularCheckup.findById(id);

        if(!data){
            return res.status(400).json({message : "No data found"});
        }

        return res.status(200).json({message : "Data fetched successfully",data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});
    }
})


router.post('/delete-regular-checkup',authMiddleware, async(req,res)=>{

    try {

        const { memberId , checkupId} = req.body;

        if(!memberId){
            return res.status(400).json({message : "Member Id is required"});
        }

        if(!checkupId){
            return res.status(400).json({message : 'CheckUp Id is required'});
        }

        await Member.findByIdAndUpdate(memberId,{$pull:{regularCheckup : checkupId}});

        const data = await RegularCheckup.findById(checkupId);

        await data.deleteOne();

        return res.status(200).json({message : "Removed Successfully"});       
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})


router.put('/update-regular-checkup/:id', authMiddleware , async(req,res)=>{

    try {

        const { id } = req.params;

        if(!id){
            return res.status(400).json({message : 'Valid Id is required'});
        }

        const updatedData = await RegularCheckup.findByIdAndUpdate(id,req.body, {new : true});

        if(!updatedData){
            return res.status(400).json({message : ' Data not found '});
        }

        return res.status(200).json({message : "Updated Successfully",updatedData});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Internal Server Error'});
    }
})


router.get('/get-all-regular-checkup', authMiddleware , async(req,res)=>{

    try {

        const userId = req.user._id;

        const data = await RegularCheckup.find({headMember : userId});

        if(!data){
            return res.status(400).json({message : "No data found"});
        }

        return res.status(200).json({message : "Data fetched",data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
})


export default router;