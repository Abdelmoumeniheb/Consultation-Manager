const mongoose = require('mongoose');
const {Schema} = mongoose;

const docotrSchema =new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: { type: String, required: false},
    lastName: { type: String, required: false},
    dateOfBirth: {type: Date,required: false},
    specialization: {type: String,required: false},
    address: {type: String,required: false},
    city: {type: String,required: false},
    country: {type: String,required: false},
    postalCode: {type: String,required: false},
    phoneNumber: {type: String,required: false},
    experience: {type: Number,required: false},
    qualifications: {type: [String], required: false},
    consultationPrice: {type: Number, required: false},
});
const DoctorModel = mongoose.model('Doctor',docotrSchema);
module.exports = DoctorModel;