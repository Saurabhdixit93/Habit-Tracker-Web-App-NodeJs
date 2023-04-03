const passport =  require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID ,
    clientSecret:process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, cb) {
    try{
        let user = await User.findOne({ facebookId: profile.id });
        if(user){
            return cb(null , user);
        }else{
            let newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            return cb(null , user);
        }
    }catch(err){
        return cb(err);
    }
  }
));

module.exports = passport;
