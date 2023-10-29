const router = require('express').Router();
const {ReqConsultationByPatient,ConfirmedConsultationbyDoctor,RefusedConsultationbyDoctor,ProposeConsultationByDoctor,ConfirmeConsultationByPatient,DoneConsultationByDoctor,getAllConsultation,getConsultationById,updateConsultation,deleteConsultation}=require('../controllers/consultationController');
const {authAdmin,authPatient,authDoctor} = require("../middleware/auth");
router.post('/RequestConsultationByPatient',authPatient,ReqConsultationByPatient);
router.put('/ConfirmedConsultationbyDoctor',authDoctor,ConfirmedConsultationbyDoctor);
router.put('/RefusedConsultationbyDoctor',authDoctor,RefusedConsultationbyDoctor);
router.post('/ProposeConsultationByDoctor',authDoctor,ProposeConsultationByDoctor);
router.put('/ConfirmeConsultationByPatient',authPatient,ConfirmeConsultationByPatient);
router.put('/DoneConsultationByDoctor',authDoctor,DoneConsultationByDoctor);
router.get('/getAllConsultation',authAdmin,getAllConsultation);
router.get('/getConsultationById/:id',authAdmin,getConsultationById);
router.put('/updateConsultation/:id',authAdmin,updateConsultation);
router.delete('/deleteConsultation/:id',authAdmin,deleteConsultation);

module.exports=router;