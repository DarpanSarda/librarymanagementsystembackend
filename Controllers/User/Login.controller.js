const UserModel = require("../../Models/User.model");
const jwtProvider = require('../../Config/JwtProvider');
const bcrypt = require('bcrypt');

const LoginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const userexist = await UserModel.findOne({email:email});
        if(!userexist)
        {
            return res.status(400).send({
                success:false,
                message:"Please Signup First"
            });
        }
        if(!userexist.isVerified || userexist.otp!='0')
        {
            return res.status(400).send({
                success:false,
                message:"Please Verify"
            });
        }
        const ispasswordsame = await bcrypt.compare(password,userexist.password);
        if(!ispasswordsame)
            {
                return res.status(400).send({
                    success:false,
                    message:"Wrong Credentials"
                }); 
            }
        const jwt = await jwtProvider.generateToken(userexist._id);
        
        return res.status(200).send({
            jwt,
            message:"Login Success",
            success:true,
            userexist,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:error.message,
            success:false
        })       
    }
}

module.exports = {LoginController};