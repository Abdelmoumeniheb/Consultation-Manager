const consultation = require('../models/consultationModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const User = require('../models/userModel');
require('dotenv').config();

const ReqConsultationByPatient = async (req,res)=>{
    const {doctorId,dateRequest,dateOfResponse,dateAppointment,symptoms,diagnosis,medications,notes}=req.body;
    try {
        const existingConsultation = await consultation.find({
            doctor: doctorId,
            patient: req.user._id,
            state: { $in: ["Pending", "Confirmed"] },
            });
        if (existingConsultation.length > 0) {
            return res.status(400).json({ message: "A consultation with this doctor already exists with "+existingConsultation.state+" state." });
        }
        const newConsultation = new consultation({
            doctor: doctorId,
            patient: req.user._id,
            dateOfRequestorPropsal: new Date(),
            dateRequestorPropsal: dateRequest,
            dateOfResponse: dateOfResponse,
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

const ConfirmedConsultationbyDoctor= async (req,res)=>{
    const { consultationId } = req.body; 
    try {
        const existingConsultation = await consultation.findById(consultationId);
        if(!existingConsultation){
            return res.status(400).json({ message: "Consultation not found." });
        }else if(existingConsultation.state!="Pending"){
            const updatedConsultation = await consultation.findByIdAndUpdate(
            consultationId,
            { state: "Confirmed",
            dateOfResponse: new Date(),
            dateAppointment: existingConsultation.dateRequest 
            },
            { new: true }
        );
        return res.json(updatedConsultation);
        }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
}

const RefusedConsultationbyDoctor = async (req,res)=>{
    const { consultationId } = req.body; 
    if(!consultationId){
        return res.status(400).json({ message: "ConsultationId not found." });
    }
    try {
        const existingConsultation = await consultation.findById(consultationId);
        if(!existingConsultation){
            return res.status(400).json({ message: "Consultation not found." });
        }
        else if(existingConsultation.state!="Pending"){
            const updatedConsultation = await consultation.findByIdAndUpdate(
            consultationId,
            { state: "Refused",
            dateOfResponse: new Date(),
            },
            { new: true }
        );
        return res.json(updatedConsultation);
        }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
}

const ProposeConsultationByDoctor = async (req,res)=>{
    const {dateProposal}=req.body;
    try {
        const existingConsultation = await consultation.find({
            doctor: req.user._id,
             dateRequestorPropsal:{
                 $gte: new Date(Date.parse(dateProposal) - 15 * 60 * 1000), 
                 $lte: new Date(Date.parse(dateProposal) + 15 * 60 * 1000), 
            },
            state: { $in: ["Pending","proposal","Confirmed"] },
            });
        if (existingConsultation.length > 0) {
            return res.status(400).json({ message: "A of consultation with this doctor already exists with "+existingConsultation.state+" state in this time ."+dateProposal+" ." });
        }
        const newConsultation = new consultation({
            doctor: req.user._id,
            patient: null,
            dateOfRequestorPropsal: new Date(),
            dateRequestorPropsal: dateProposal,
            state: "Proposal"
        });
        await newConsultation.save();
        return res.json(newConsultation);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}
const ConfirmeConsultationByPatient = async (req,res)=>{
    const { consultationId } = req.body; 
    try {
        const existingConsultation = await consultation.findById(consultationId);
        if(!existingConsultation){
            return res.status(400).json({ message: "Consultation not found." });
        }else if(existingConsultation.state!="Pending"){
            const updatedConsultation = await consultation.findByIdAndUpdate(
            consultationId,
            { patient: req.user._id, 
            state: "Confirmed",
            dateOfResponse: new Date(),
            dateAppointment: existingConsultation.dateRequestorPropsal 
            },
            { new: true }
        );
        return res.json(updatedConsultation);
        }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
}

const getAllConsultation=async (req,res)=>{
    try{
        const consultations=await consultation.find();
        res.json(consultations);
    }
    catch(err){
        res.json({message:err});
    }
}
const getConsultationById=async (req,res)=>{
    console.log(req.params.id);
    try{
        const oneConsultation = await consultation.findById(req.params.id);
        if(!oneConsultation){
            return res.status(400).json({ message: "Consultation with id "+req.params.id+" not found." });
        }
        return res.json(oneConsultation);
    }
    catch(err){
        res.json({message:err});
    }
}
const updateConsultation=async (req,res)=>{
    try{
        console.log(req.body.notes);
        const updatedConsultation=await consultation.findByIdAndUpdate(req.params.id,{doctor:req.body.doctor,patient:req.body.patient,date:req.body.date,symptoms:req.body.symptoms,diagnosis:req.body.diagnosis,medications:req.body.medications,notes:req.body.notes,state:req.body.state});
        res.json(updatedConsultation);
    }
    catch(err){
        res.json({message:err});
    }
}
const deleteConsultation=async (req,res)=>{
    try{
        const deletedConsultation=await consultation.findByIdAndRemove(req.params.id);
        res.json("consultation deleted");
    }
    catch(err){
        res.json({message:err});
    }
}
module.exports={ReqConsultationByPatient,ConfirmedConsultationbyDoctor,RefusedConsultationbyDoctor,ProposeConsultationByDoctor,ConfirmeConsultationByPatient,getAllConsultation,getConsultationById,updateConsultation,deleteConsultation};