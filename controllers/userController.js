const user=require('../models/userModel');
const Doctor=require('../models/doctorModel');
const Patient=require('../models/patientModel');
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const getallUsers=async(req,res)=>{
    try{
        const users=await user.find();
        res.json(users);
    }
    catch(err){
        res.json({message:err});
    }
}

const getuserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await user.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const Registeruser =async(req,res)=>{
const {email,password,confirmPassword,role} =req.body;
const resultat=await user.findOne({email});
if(!email){
    res.status(400).json({message:"email is empty"});
}
else if(!password){
    res.status(400).json({message:"password is empty"});
}
else if(!confirmPassword){
    res.status(400).json({message:"confirm password is empty"});
}
else if(resultat){
    res.status(400).json({message:"email already exist"});
}
else if(password!==confirmPassword){
    res.status(400).json({message:"password not match"});
}
else if(!role){
    res.status(400).json({message:"role is empty"});
}
else if(role!=="admin" && role!=="patient" && role!=="doctor"){
    res.status(400).json({message:"role not exist"});
}
else{
    const newuser=new user({
        email,
        password:await bcrypt.hash(password,10),
        role
        });
    if(role==="doctor"){
        const newdoctor=new Doctor({
            user: newuser._id,
        });
        await newuser.save();
        await newdoctor.save();
    }else if(role =="patient"){
        const newpatient=new Patient({
            user: newuser._id,
        });
        await newuser.save();
        await newpatient.save();
    }else{
        await newuser.save();
    }   
    try{
        res.json(newuser);
    }
    catch(err){
        res.json({message:err});
    }
}
}
const Logoutuser = async (req, res) => {
    const token = req.cookies.token_user; 
    if (token) {
        res.cookie('token_user','',{httpOnly:true}).json({message:"ok"});
    }else{
        return res.json({message:"toke is empty"});
    }
};
const Loginuser = async(req,res)=>{
    const {email,password}=req.body;
    const userExist=await user.findOne({email});
   if(userExist){
        const passOk=bcrypt.compareSync(password,userExist.password);
        if(passOk){
            const token = jwt.sign({id:userExist._id,email:userExist.email},process.env.JWT_SECRET);
            res.cookie('token_user',token,{httpOnly:true}).json({token});
        }else{
            res.status(400).json({message:"password not match"});
        }
    }else{
        res.status(400).json({message:"email not exist"});
    }
}
const Verifyuser = async (req, res) => {
    const token = req.cookies.token_user;
    if (token!=="") {
      const decoded = jwt.verify(token, jwtSecret);
      const user = await user.findById(decoded.id);
      res.cookie('token_user',token,{httpOnly:true}).json({ user: user, message: 'ok' });
    } else {
      res.status(400).json({ message: 'token not exist' });
    }
};
module.exports={Registeruser,Loginuser,getuserById,getallUsers,Logoutuser,Verifyuser};