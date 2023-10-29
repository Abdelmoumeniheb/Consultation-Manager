const router=require('express').Router();
const {getDoctorById,getallDoctor,updateDoctor}=require('../controllers/doctorController.js');
router.get('/',getallDoctor);
router.get('/:id',getDoctorById);
router.put('/Update/:id',updateDoctor);
module.exports=router;