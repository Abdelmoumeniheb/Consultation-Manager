const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const mongoose=require('./config/db.js');
const mongo=require('./config/db');
const cors=require('cors');

app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: ['http://localhost:4200', 'http://localhost:64011']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));    

const patientRoutes =require('./routers/patientRouter.js');
const doctorRoutes =require('./routers/doctorRouter.js');
const consultationRoutes =require('./routers/consultationRouter.js');
const userRoutes =require('./routers/userRouter.js');
app.use('/patient',patientRoutes);
app.use('/doctor',doctorRoutes);
app.use('/consultation',consultationRoutes);
app.use('/user',userRoutes);
app.listen(3800,()=>{
console.log("Port 3800 Working");
})
module.exports = app;