const Patient=require('../models/patientModel');
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');

const getallpatient=async(req,res)=>{
    try{
        const patients=await Patient.find();
        res.json(patients);
    }
    catch(err){
        res.json({message:err});
    }
}

const getPatientById = async (req, res) => {
    const patientId = req.params.id;
    try {
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const updatePatient = async (req, res) => {
const { id } = req.params; 
  const { firstName, lastName, email, address, City, Country, PostalCode, photos, dateOfBirth, sexe } = req.body;
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { firstName, lastName, email, address, City, Country, PostalCode, photos, dateOfBirth, sexe },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports={getPatientById,getallpatient,updatePatient};