var mongoose = require('mongoose');

//level 5
const passportLocalMongoose =require('passport-local-mongoose')
const passport=require('passport')
//level 6
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

var schema = new mongoose.Schema({
    email: String,
    password: String,
    //level 6
    googleId: String,
});

let userSchema = new mongoose.Schema({
    email: String,
    password: String,
    //level 6
    googleId: String,
});

schema.plugin(passportLocalMongoose)

schema.plugin(findOrCreate)

let userModel = new mongoose.model("User", schema);
//level 5
passport.use(userModel.createStrategy())
//passport.serializeUser(userModel.serializeUser())
//passport.deserializeUser(userModel.deserializeUser())
//
//level 6
passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err,user)
    })
})

//level 6
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:80/auth/google/favorite"
    },
    function(accessToken, refreshToken, profile, cb) {
        userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));
//
module.exports = userModel;

