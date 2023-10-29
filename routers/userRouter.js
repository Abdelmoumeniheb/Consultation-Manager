const router=require('express').Router();
const {Registeruser,Loginuser,getuserById,getallUsers,Logoutuser,Verifyuser}=require('../controllers/userController.js');
router.get('/',getallUsers);
router.get('/:id',getuserById);
router.post('/Register',Registeruser);
router.post('/Login',Loginuser);
router.post('/Logout',Logoutuser);
router.post('/Verify',Verifyuser);
module.exports=router;