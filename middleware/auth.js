const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require('dotenv').config();
const authAdmin = async (req,res,next)=>{
    try{
        const token = req.cookies.token_user ;
        if(!token){
            return res.status(401).json({error:"token not found"});
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        console.log(verified); 
        const user = await User.findById(verified.id);
        if (user.role === 'admin') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied. Only admins are allowed.' });
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({error:"unauthorized"});
    }
}
const authPatient = async (req, res, next) => {
    try{
        const token = req.cookies.token_user ;
        if(!token){
            return res.status(401).json({error:"token not found"});
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        console.log(verified); 
        const user = await User.findById(verified.id);
        if (user.role === 'patient') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied. Only patients are allowed.' });
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({error:"unauthorized"});
    }
};

const authDoctor = async (req, res, next) => {
    try{
        const token = req.cookies.token_user ;
        if(!token){
            return res.status(401).json({error:"token not found"});
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        console.log(verified); 
        const user = await User.findById(verified.id);
        if (user.role === 'doctor') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied. Only doctors are allowed.' });
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({error:"unauthorized"});
    }
};

const authPatientAdmin = async (req, res, next) => {
    try{
        const token = req.cookies.token_user ;
        if(!token){
            return res.status(401).json({error:"token not found"});
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        console.log(verified); 
        const user = await User.findById(verified.id);
        if (user.role === 'patient' || user.role === 'admin') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied. Only patients and admins are allowed.' });
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({error:"unauthorized"});
    }
};

module.exports = {authAdmin,authPatient,authDoctor};