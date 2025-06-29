import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

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

    doctorName : {
        type : String,
        require : true
    },

    date : {
        type : Date
    },


    disease : {
        type : String,
        require : true
    },

    details : {
        type : String,
        require : true
    },

    image : {
        public_id : {
            type : String,
            require : true
        },

        url :{
            type : String,
            require : true
        }
    },



},{timestamps:true});

const TestReport = mongoose.model('testReport',reportSchema);

export default TestReport;