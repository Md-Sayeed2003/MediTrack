import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';
import fileUpload from 'express-fileupload';
import cors from 'cors'

const app = express();
dotenv.config();

import conn from './Connection/conn.js';
import userApi from './routes/user-route.js'
import memberApi from './routes/member-route.js'
import doctorApi from './routes/doctorVisit-route.js'
import reportApi from './routes/testReport-route.js'
import checkupApi from './routes/checkup-route.js'



const port = process.env.PORT;


// database connection
conn();


//middleware

app.use(express.json());
app.use(cookieParser());


app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp/",
   })
);

// cors policy
app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}));


//routes
app.use('/api/v1',userApi);
app.use('/api/v1',memberApi);
app.use('/api/v1',doctorApi);
app.use('/api/v1',reportApi);
app.use('/api/v1',checkupApi);


//cloudinary configuration

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_SECRET_KEY
});



app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`);
})