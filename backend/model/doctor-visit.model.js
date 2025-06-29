import mongoose from "mongoose";

const doctorVisitSchema = new mongoose.Schema({

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
        type : String,
    },

    disease : {
        type : String,
        require : true
    },

    symptoms : {
        type : String,
        require : true
    },

    recommendation : {
        type : String,
        require : true
    },

    image : {
        public_id : {
            type : String,
            require : true
        },
        url : {
            type : String,
            require : true
        }
    },

},{timestamps:true})

const DoctorVisit = mongoose.model('doctorVisit',doctorVisitSchema);

export default DoctorVisit;