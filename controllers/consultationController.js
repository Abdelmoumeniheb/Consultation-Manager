const consultation = require('../models/consultationModel');
const Doctor=require('../models/doctorModel');
require('dotenv').config();

const ReqConsultationByPatient = async (req,res)=>{
    const {doctorId,dateRequest,dateAppointment,symptoms,diagnosis,medications,notes}=req.body;
    try {
        const existingConsultation = await consultation.find({
            doctor: doctorId,
            // patient: req.user._id,
            // state: { $in: ["Pending", "Confirmed"] },
            });
        if (existingConsultation) {
            console.log("ty  wink");
            return res.status(400).json({ message: "A consultation with this doctor already exists with "+existingConsultation.state+" state." });
        }
        const newConsultation = new consultation({
            doctor: doctorId,
            patient: req.user._id,
            dateOfRequest: new Date(),
            dateRequest: dateRequest,
            dateAppointment: dateAppointment,
            symptoms: symptoms,
            diagnosis: diagnosis,
            medications: medications,
            notes: notes,
            state: "Pending"
        });
        await newConsultation.save();
        return res.json(newConsultation);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

const addConsultation= async (req,res)=>{
    const {doctor,patient,dateDemande,dateAppointment,symptoms,diagnosis,medications,notes,state}=req.body;
    const newConsultation=new consultation({doctor,patient,dateDemande:new Date(),dateAppointment,symptoms:"",diagnosis:"",medications:"",notes:"",state:"Pending"});
    await newConsultation.save();
    try{
        res.json(newConsultation);
    }
    catch(err){
        res.json({message:err});
    }
}
const getConsultation=async (req,res)=>{
    try{
        const consultations=await consultation.find();
        res.json(consultations);
    }
    catch(err){
        res.json({message:err});
    }
}
const getConsultationById=async (req,res)=>{
    try{
        const consultation=await consultation.findById(req.params.id);
        res.json(consultation);
    }
    catch(err){
        res.json({message:err});
    }
}
const updateConsultation=async (req,res)=>{
    try{
        const updatedConsultation=await consultation.updateOne({_id:req.params.id},{$set:{doctor:req.body.doctor,patient:req.body.patient,date:req.body.date,symptoms:req.body.symptoms,diagnosis:req.body.diagnosis,medications:req.body.medications,notes:req.body.notes,state:req.body.state}});
        res.json(updatedConsultation);
    }
    catch(err){
        res.json({message:err});
    }
}
const deleteConsultation=async (req,res)=>{
    try{
        const deletedConsultation=await consultation.deleteOne({_id:req.params.id});
        res.json(deletedConsultation);
    }
    catch(err){
        res.json({message:err});
    }
}
module.exports={ReqConsultationByPatient,addConsultation,getConsultation,updateConsultation,getConsultationById};