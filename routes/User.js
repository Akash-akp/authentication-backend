const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controller/user_controller');

router.get('/SignUp',passport.alreadysignedin,userController.signUp);
router.get('/SignIn',passport.alreadysignedin,userController.signIn);
router.get('/SignOut',userController.destroy);
router.get('/verified',passport.checkAuthentication,userController.verified);
router.post('/create',userController.create);

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: 'SignIn'}
),userController.createSession);

module.exports = router;