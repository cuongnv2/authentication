/**
 * Created by cuongnguyen on 8/13/20.
 */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const config = require('./config');
const UserModel = require('./model/user');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtRequireAuth = new JwtStrategy(jwtOptions, function(payload, done){
    UserModel.findById(payload.sub, function(err, user){
       if (err) return done(err, false);

       if(!user) return done(null, false);

       return done(null, user);
    });
});

const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    UserModel.findOne({email: email}, function(err, user){
        if(err) return done(err);
        if(!user) return done(null, false);
        return done(null, user);
    });
});


passport.use(jwtRequireAuth);
passport.use(localLogin);