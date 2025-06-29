import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

const authMiddleware = async(req,res,next)=>{

    const token = req.cookies.userToken;

    try {

        if(token){

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(decode.id);

            if(!user){
                return res.status(400).json({message : "User not found"});
            }

            req.user = user;

            next();

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }

}

export default authMiddleware;