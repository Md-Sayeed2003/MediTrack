import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({

    username : { 
        type : String,
        require : true
    },
 
    password : {
        type : String,
        require : true
    },

    email : {
        type : String,
        require : true,
        unique : true
    },

    age : {
        type : Number
    },

    dob :{
        type : Date
    },

    bloodGroup :{
        type : String
    },

    height : {
        type : String
    },

    weight :{
        type : String
    }
    
},
 {timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;