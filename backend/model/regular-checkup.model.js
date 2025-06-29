import mongoose from "mongoose";

const checkupSchema = new mongoose.Schema({

    headMember : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    
    memberName :{
        type : String,
    },
    
    memberAge : {
        type : Number
    },
        
    memberRelation :{
        type : String
    },
    
    memberName :{
        type : String,
    },
    
    memberAge : {
        type : Number
    },
    
    memberRelation :{
        type : String
    },
    
    date : {
        type : String
    },

    bp :{
        type : String,
        require : true
    },

    sugarLevel :{
        fasting : {
            type : String,
            require : true
        },

        random : {
            type : String,
            require : true
        },

        pp : {
            type : String,
            require : true
        }
    },


    bodyTemp : {
        type : String,
        require : true
    },

    spo2 :{
        type : String,
        require : true
    },

    heartRate : {
        type : String,
        require : true
    },

    colestrolLevel : {
        type : String,
        require : true
    },

    weight : {
        type : String,
        require : true
    },

    bmi :{
        type : String,
        require : true
    },

    sleepDuration : {
        type : String,
        require : true
    }

},{timestamps:true})

const RegularCheckup = mongoose.model('regularCheckup',checkupSchema);

export default RegularCheckup;