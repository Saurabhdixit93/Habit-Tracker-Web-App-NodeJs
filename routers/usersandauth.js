const express = require('express');
const router = express.Router();

// import passport
const passport = require('passport');
// importing user controller with forgot password controller
const userController = require('../controllers/user-and-auth-controller');



router.get('/sign-up' , userController.signup)
router.get('/log-in' , userController.login)

// sign up crete route
router.post('/create-user', userController.create);
// sigin session using middleware passport
router.post('/login-user-session',passport.authenticate('local',{
    failureRedirect:'/user/log-in',
    successFlash: true
},
),userController.create_session);
// signOut request
router.get('/sign-out',  userController.destroySession);







// password reset routers
router.get('/auth/forgot-password',userController.showForgotPassword )

// Route to send a password reset email
router.post('/auth/forgot-password/', userController.forgotPassword);
// Route to handle a password reset link
router.get('/auth/reset-password/:token', userController.handleResetPasswordLink);

// Route to handle a password reset form submission
router.post('/auth/reset-password/', userController.resetPassword);





// facebook login routers
router.get('/auth/facebook-login',
  passport.authenticate('facebook'));

  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/user/log-in' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;