const router=require('express').Router();
const {getDoctorById,getallDoctor,updateDoctor}=require('../controllers/doctorController.js');
const {authAdmin,authPatient,authDoctor} = require("../middleware/auth");
router.get('/',authAdmin,getallDoctor);
router.get('/:id',authAdmin,getDoctorById);
router.put('/Update/:id',authAdmin,updateDoctor);
module.exports=router;