import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conn = async()=>{
    try {
        
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("Connected to MongoDB");

    } catch (error) {
        console.log(error);
    }
}


export default conn;