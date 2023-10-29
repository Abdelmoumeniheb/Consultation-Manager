const router=require('express').Router();
const {getPatientById,getallpatient,updatePatient}=require('../controllers/patientController.js');
router.get('/',getallpatient);
router.get('/:id',getPatientById);
router.put('/Update/:id',updatePatient);
module.exports=router;