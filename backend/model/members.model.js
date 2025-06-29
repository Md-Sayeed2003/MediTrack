import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({

    head : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
 
    name : {
        type : String,
        require : true
    },

    age : {
        type : String,
        require : true
    },

    gender : {
        type : String,
        require : true,
        enum : ['male' , 'female','others']
    },

    dob : {
        type : Date,
    },

    relation :{
        type : String,
        require : true,
    },

    bloodGroup : {
        type : String,
        require : true
    },

    height : {
        type : String,
        require : true
    },

    weight : {
        type : String,
        require : true
    },

    // regularCheckup : [
    //     {
    //         type : mongoose.Types.ObjectId,
    //         ref : 'regularCheckup'
    //     },
    // ],

    // doctorVisit : [
    //     {
    //         type : mongoose.Types.ObjectId,
    //         ref : 'doctorVisit'
    //     },
    // ],

    // testReport : [
    //     {
    //         type : mongoose.Types.ObjectId,
    //         ref : 'testReport'
    //     },
    // ]

    

},{timestamps:true});

const Member = mongoose.model('members',memberSchema);

export default Member;