// import neccesary modules

const User = require('../models/user')
const nodemailer =  require('nodemailer');
const PasswordReset = require('../models/PasswordReset');
const ejs = require('ejs');
const fs = require('fs');
const crypto = require('crypto');

//-------------------------------- Account creation and verification --------------------------------------------------------

module.exports.signup = (req,res) =>{
    if(req.isAuthenticated()){
        req.flash('error','first Logout to create new account !');
        return res.redirect('/');
    }
    return res.render('user-signup',{
        title: 'Habbit-Tracker | Sign Up Page',
        message: { type: null, text: null },
    });
}
module.exports.login = (req,res) =>{
    if(req.isAuthenticated()){
        req.flash('error','first Logout to create new account !')
        return res.redirect('/');
    }
    return res.render('user-signin',{
        title: 'Habbit-Tracker | Sign in Page',
        message: { type: null, text: null },
    });
}



// get the data from sign Up
module.exports.create = async (request , response) =>{
    try{
        if(request.body.password != request.body.confirm_password){
            request.flash('error' , 'Wrong Username Or Password !');
            return response.redirect('back');
        } 
        let user = await User.findOne({email: request.body.email});
         // If no user with that mail then create
        if(!user){
            let user = await User.create(request.body);
            request.flash('success' , 'User Account Created Successfully');
            return response.redirect('/user/log-in');
        }else{
            request.flash('error' , 'User Account Already');
            return response.redirect('back');
        }
    }catch(err){
        response.status(400).json({
            message:'Internall Server Error !!'
        })
        return;
    }
}

// create the session for the user
module.exports.create_session = (request,response) =>{
    // Using passposrt Js library use
    request.flash('success', 'Log In Successfully');
    return response.redirect('/');
}

// For SignOut 
module.exports.destroySession = (request , response) =>{
    request.logout(function(err) {
        if (err) {
            response.status(400).json({
                message:'Internall Server Error !!'
            })
            return;
        }
        request.flash('success' , 'Logged Out Successfully');
        return response.redirect('/');
    });
}


//----------------------------- password reset-----------------------------------------------------

// email template load from viewfiles
const passwordResetTemplate = fs.readFileSync('./viewfiles/passwordreset/passwordResetMail.ejs','utf-8');



// Transporter
const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 465, 
    auth: {
      user:process.env.NODEMAILER_USERNAME,
      pass:process.env.NODEMAILER_PASSWORD
    },
    secure: true,
  });


//form render
module.exports.showForgotPassword = async (req, res) => {
    return res.render('forgotPassword',{
      title: 'Forgot Password Page |',
      message: {typs:null ,text:null}
    });
  };


// forgot password controller
exports.forgotPassword = async (req, res) => {
    try{
  
      const { email } = req.body;
      // Find the user associated with the email
      const user = await User.findOne({ email });
    
      if (!user) {
        return res.render('forgotPassword', { 
          title:'Forgot Passwor Page',
          message: { type: 'danger', text: 'No user found with that email address.' }
        });
      }
      // Set the token expiration time in minutes
        const tokenExpirationInMinutes = 30;
        // Generate a random token using the crypto module
        const generateToken = () => {
          const token = crypto.randomBytes(64).toString('hex'); 
          const secret ='SECRET_RESET_TOKEN_KEY';
          const hash = crypto.createHmac('sha256' , secret).update(token).digest('hex');
          const expirationTime = new Date().getTime() + tokenExpirationInMinutes * 60 * 1000;
          return {
            hash,
            expirationTime,
          };
        };
        // Generate a password reset token
        const myToken = generateToken();
  
      const passwordReset = new PasswordReset({
        userId: user,
        token: myToken.hash,
        isValid: true,
      });
      await passwordReset.save();
  
      // email template setup 
      const resetLink = `${req.protocol}://${req.get('host')}/user/auth/reset-password/${myToken.hash}`;
      const renderedTemplate = ejs.render(passwordResetTemplate,{ resetLink , user });
    
      // Construct the password reset email
      const mailOptions = {
        from:process.env.NODEMAILER_FROM_EMAIL ,
        to: user.email,
        cc: process.env.NODEMAILER_CC_EMAIL,
        subject: `Password Reset Request`,
        html: renderedTemplate,
        envelope:{
          from: process.env.NODEMAILER_FROM_EMAIL,
          to: user.email
        },
      };
      // Send the email
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log('ERROR !' , err);
          req.flash('error' ,'Error:'+ err.message);
          res.render('forgotPassword', {
            title:'Forgot Password Page | My Book',
            message: { type: 'danger', text: 'There was an error sending the password reset email. Please try again later.' }
          });
        } else {
          res.render('forgotPassword', {
            title:'Forgot Password Page | My Book',
            message: { type: 'success', text: 'A password reset link has been sent to your email address.' }
          });
        }
      });
    }catch(err){
      console.log('Eeror' , err);
      req.flash('error' ,'Error:'+ err.message);
      return res.render('forgotPassword', { 
        title:'Forgot Password Page | My Book',
        message: { type: 'danger', text: 'Inernal Server Error !!..' }
      });
    }
  };
  

  
//password link handelor
exports.handleResetPasswordLink = async (req, res) => {
    try{
      const { token } = req.params;
      // Look up the password reset token in the database
      const passwordReset = await PasswordReset.findOne({token});
      // If the token doesn't exist, display an error message
    if (!passwordReset) {
      return res.render('forgotPassword', { 
        title:'Forgot Password Page | My Book',
        message: { type: 'danger', text: 'Invalid password reset link. Please request a new link.' }
      });
    }
    // Render the password reset form
    return res.render('resetPassword', {
      title:'Forgot Password Final Page',
      token:passwordReset.token,
      message: { type: 'success', text: 'Update Your Password Now' }
    });
    }catch(err){
      req.flash('error' ,'Error:'+ err.message);
      return res.render('forgotPassword', { 
        title:'Forgot Password Page ',
        message: { type: 'danger', text: 'Internal Server Error !.' }
      });
    }
  };

  
// reset password updates
exports.resetPassword = async (req, res) => {
    try{
      // console.log(req.query);
      const passwordReset = await PasswordReset.findOne({token : req.query.youruniqtoken});
      
      // If the token doesn't exist, display an error message
      if (!passwordReset) {
          return res.render('resetPassword', {
            title:'Forgot Password Final Page ', 
            token: passwordReset.youruniqtoken,
            message: { type: 'danger', text: 'Password reset Link Expired. Please request a new link.' }
          });
      }
      // If the token has expired, display an error message
      if(passwordReset.isValid){
    
        passwordReset.isValid = false; 
    
        if(req.body.password == req.body.confirm_password){
          const user = await User.findById(passwordReset.userId);
          if(user){
            user.password = req.body.password;
            user.confirm_password = req.body.confirm_password;
            passwordReset.save();
            user.save();
            // Redirect the user to the login page with a success message
            return res.render('user-signin', {
              title:'Sign-in Page ',
              message: { type: 'success', text: 'Your password has been reset. Please log in with your new password.' }
            });
          }else{
            request.flash('error' , 'Password did not matched');
            return response.redirect('back');
          }
        }else{
          return res.render('resetPassword', {
            title:'Forgot Password Final Page ', 
            token: passwordReset.token,
            message: { type: 'danger', text: 'Password and Confirm Passwrod Not Matched.' }
          });
        }
      }else{
        return res.render('forgotPassword', { 
          title:'Forgot Password Page ',
          message: { type: 'danger', text: 'Invalid password reset Token. Please request a new Token.' }
        });
      }
    }catch(err){
      req.flash('error' ,'Error:'+ err.message);
      return res.render('forgotPassword', { 
        title:'Forgot Password Page | My Book',
        message: { type: 'danger', text: 'Internal Server Error !!!! ..Please Try Again.' }
      });
    }
  };