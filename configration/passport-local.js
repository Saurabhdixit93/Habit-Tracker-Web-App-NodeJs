// import passport
const passport = require('passport');
// Import local-strategy
const LocalStrategy = require('passport-local').Strategy;
// import User Models
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField:'email',
        passReqToCallback:true
    },
    function(request , email , password , done){
        // find the user and establish the identity
        User.findOne({email:email}).then(user =>{
            if(!user || user.password != password){
                return done(null , false);
            }
            return done(null , user);
        }).catch(err =>{
            console.log('Error', err);
            return;
        });
    }
));

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user , done){
    done(null , user.id);
});


// de serializing the user from the key in the cookies
passport.deserializeUser(function(id , done){
    // first find user in data if it is then
    User.findById(id).then(user => {
       
        // user there
        return done(null ,user);
    }).catch(err => {
        console.log('Error', err);
        return;
    });
});



// // check if user Authenticated
passport.checkAuthentication = function(request , response , next){
    // if user signed then passed user to next function
    if(request.isAuthenticated()){
        return next();
    }

    // If user not signed then
    return response.redirect('/user/log-in');
}

// set user details
passport.setAuthenticatedUser =  function(request , response , next){
    if(request.isAuthenticated()){
        // send signed user details
        response.locals.user = request.user;
    }
    next();
}


// exports for accessing
module.exports = passport;


