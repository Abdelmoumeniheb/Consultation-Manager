const router=require('express').Router();
const {getPatientById,getallpatient,updatePatient}=require('../controllers/patientController.js');
const {authAdmin,authPatient,authDoctor} = require("../middleware/auth");
router.get('/',authAdmin,getallpatient);
router.get('/:id',authAdmin,getPatientById);
router.put('/Update/:id',authAdmin,updatePatient);
module.exports=router;