const Doctor=require('../models/doctorModel');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');

const getallDoctor=async(req,res)=>{
    try{
        const userDoctors=await User.find({role:"doctor"});
       const AlldoctorInfo = [];

        for (const doctor of userDoctors) {
          const doctorInfo = await Doctor.find({ user: doctor._id });
          const userDoctorInfo = {
            user: doctor,
            doctorInfo: doctorInfo[0],
          };
          AlldoctorInfo.push(userDoctorInfo);
        }
        res.json({"doctors":AlldoctorInfo});
    }
    catch(err){
        res.json({message:err});
    }
}
const getDoctorById = async (req, res) => {
    const doctorid = req.params.id; 
    try {
      const doctor = await Doctor.findById(doctorid);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};  
const updateDoctor = async (req, res) => {
    const { id } = req.params; 
    const {firstName,lastName,dateOfBirth,sexe,specialization,address,city,country,postalCode,phoneNumber,email,photos,experience,qualifications,consultationPrice} =req.body;
      try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
          id,
          {firstName,lastName,dateOfBirth,sexe,specialization,address,city,country,postalCode,phoneNumber,email,photos,experience,qualifications,consultationPrice},
          { new: true }
        );
    
        if (!updatedDoctor) {
          return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(updatedDoctor);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};
module.exports={getDoctorById,getallDoctor,updateDoctor};