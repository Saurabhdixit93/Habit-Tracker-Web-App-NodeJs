const passport = require('passport');
const JWTStretgy = require('passport-jwt').Strategy;
const JWTExtract = require('passport-jwt').ExtractJwt;
// const enviroment = require('./enviroment');

const User = require('../models/user');


let options = {
    jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PRIVATE_KEY
}

passport.use(new JWTStretgy(options , function(jwtPayload , done){

    try{
        let user = User.findById(jwtPayload._id)
            if(user){
                return done(null ,user);
            }else{
                return done(null ,false);
            }
    }catch(err){
        return done(err);
    }
}));


module.exports = passport;