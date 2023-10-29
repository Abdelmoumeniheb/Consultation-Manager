const mongoose = require('mongoose');
const {Schema} = mongoose;
const patientSchema =new Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    address:{ type: String, required: false },
    City:{ type: String, required: false },
    Country:{ type: String, required: false },
    PostalCode:{ type: String, required: false },
    dateOfBirth:{ type: Date, required: false },
});
const PatientModel = mongoose.model('Patient',patientSchema);
module.exports = PatientModel;