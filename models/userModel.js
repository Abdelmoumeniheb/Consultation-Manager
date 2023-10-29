const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema =new Schema({ 
      email: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['admin', 'doctor', 'patient'],
        default: ['patient'],
        },
      password: {
        type: String,
        required: true,
      },
});
const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;