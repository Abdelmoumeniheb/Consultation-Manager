const router = require('express').Router();
const {ReqConsultationByPatient,addConsultation,getConsultation,updateConsultation,getConsultationById}=require('../controllers/consultationController');
const {auth,authPatient} = require("../middleware/auth");
router.post('/RequestConsultationByPatient',authPatient,ReqConsultationByPatient);
router.post('/addConsultation',addConsultation);
router.get('/getConsultation',auth,getConsultation);
router.get('/getConsultationById/:id',auth,getConsultationById);
router.put('/updateConsultation/:id',auth,updateConsultation);

module.exports=router;