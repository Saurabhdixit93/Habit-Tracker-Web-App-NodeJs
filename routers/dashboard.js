const express = require('express');
const router = express.Router();
const passport = require('passport');

//dashboard controller require
const dashboardController = require('../controllers/dashboardController');
// dashboard router
router.get('/dashboard-page', passport.checkAuthentication,dashboardController.dashboard);
router.get('/daily', passport.checkAuthentication,dashboardController.daily);  

module.exports = router;