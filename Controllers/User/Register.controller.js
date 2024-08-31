const UserModel = require("../../Models/User.model");
const generateOTP = require('../../utils/otpgenerator');
const {sendEmail} = require('../../utils/nodemailer');
const jwtProvider = require('../../Config/JwtProvider');
const bcrypt = require('bcrypt');

const RegisterUser = async (req, res) => {
  try {
    let = { name, email, password, age } = req.body;
    console.log(req.body)
    const otp = generateOTP();
    console.log(otp)
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is Required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is Required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is Required",
      });
    }
    
    const userExist = await UserModel.findOne({email:email});
    if(userExist)
    {
        return res.status(400).send({
            success: false,
            message: "User Already exist !!",
          });
    }
    password = await bcrypt.hash(password,8);
    const User = new UserModel({
        name:name,
        email:email,
        password:password,
        age:age,
        otp:otp,
        otp_expiry: new Date(Date.now() + 60 * 60 * 1000) 
    })
    console.log(User)

    await User.save();
    if(!User)
    {
        return res.status(400).send({
            success: false,
            message: "Please Try after Sometime",
          });
    }
    sendEmail(email, 'OTP for Registration to LMS', `Your Otp is ${otp}`);
    return res.status(200).send({
        success:true,
        message:"User Registered Successfully"
    })
  } catch (error) {
    return res.status(400).send({
        success:false,
        error:error.message
    })
  }
};

const ResendOTP = async (req, res) => {
    const { email } = req.body;
    const OTP = generateOTP();
    const otpexpire = new Date(Date.now() + 60 * 60 * 1000);

    console.log(`Email: ${email}`); // Log the email

    try {
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { otp: OTP, otp_expiry: otpexpire ,isVerified:false  },
            { new: true }
        );

        if (!user) { 
            return res.status(404).json({ message: 'User not found' });
        }

        sendEmail(email, 'Resent OTP For verification', `Your Otp is ${OTP}`);

        return res.status(200).json({ success:true , message: 'OTP resent', user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const VerifyEmail = async (req, res)=>{
    try {
        // console.log(req.body)
        const { email, otp } = req.body
        const emailExists = await UserModel.findOne({ email:email })
        console.log('emailExists:', emailExists)
        if (emailExists.length <= 0) return res.status(404).send({success:false , message:"User Not Found"});
        try {
            const User = await UserModel.findOne({email:email , otp:otp});
            if(!User)
            {
                return res.status(404).send({success:false , message:"Some Failure occured"});
            }
            const otp_ex = new Date()> new Date(User.otp_expiry);
            if(otp_ex)
            {
                return res.status(404).send({success:false , message:"Your Otp is expired"});
            }
            const alreadyverified = User.isVerified;
            if(alreadyverified)
            {
                return res.status(404).send({success:false , message:"Already Verified"});
            }
            await UserModel.updateOne({email:email , isVerified:true, otp:0});
            const usertoken = await UserModel.findOne({email:email});
            sendEmail(email, `Welcome to LMS!`, `Hello , Welcome to the Virtual Library`);
            const jwt = jwtProvider.generateToken(usertoken._id);
            return res.status(200).send({
                jwt,
                success:true,
                message: 'You have been successfully loggedIn',
            });
        } catch (error) {
            console.log('VerifyEmail error:', error)
            return res.status(500).json({ message: error.message });
        }
    } catch (error) {
        console.log('Outer error:', error)
        return res.status(500).json({ message: error.message });
    }
} 

module.exports = {RegisterUser , ResendOTP , VerifyEmail}