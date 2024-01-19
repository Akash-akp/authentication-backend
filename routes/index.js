const express = require('express');
const passport = require('passport');


const router = express.Router();

const homeController = require('../controller/home_controller');

router.use('/User',require("./User"));
router.get('/',passport.checkAuthentication,homeController.home);

module.exports = router;