const express = require('express');
const router = express.Router();

// home controller require
const homeController = require('../controllers/home-controller');
// home router
router.get('/',homeController.homepage);
// dashboard router
router.use('/user/new' , require('./dashboard'));

// habits router importing
router.use('/habit',require('./habit')); 

// auth router
router.use('/user' , require('./usersandauth'));     

module.exports = router;