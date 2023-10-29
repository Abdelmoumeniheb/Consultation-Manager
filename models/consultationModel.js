const mongoose = require('mongoose');
const Doctor = require('./doctorModel');
const Patient = require('./patientModel');
const consultationSchema = new mongoose.Schema({
  doctor: {type: mongoose.Schema.Types.ObjectId,ref: 'Doctor',required: true},
  patient: {type: mongoose.Schema.Types.ObjectId,ref: 'Patient',required: true},
  dateOfRequest: {type: Date,required: true},
  dateRequest: {type: Date,required: false},
  dateAppointment: {type: Date,required: false},
  symptoms: {type: String,required: false},
  diagnosis: {type: String,required: false},
  medications: {type: [String],required: false},
  notes: {type: String,required: false},
  state: {type: String,required: true},
});
module.exports = mongoose.model('Consultation', consultationSchema);