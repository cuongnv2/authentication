/**
 * Created by cuongnguyen on 8/13/20.
 */
const jwt = require('jwt-simple');
const UserModel = require('../model/user');
const config = require('../config');

function tokenForUser(user) {
    return jwt.encode({ sub: user.id, iat: new Date().getTime() }, config.secret);
}

exports.signin = function(req, res, next) {
    res.send({token: tokenForUser(req.user)});
};

exports.signup = function(req, res, next) {
    const fullName = req.body.fullName;
    const gender = req.body.gender;
    const email = req.body.email;
    const password = req.body.password;
    const province = req.body.provinceId;
    const district = req.body.districtId;
    const school = req.body.schoolId;

    if(!email || !password){
        res.status(422).send({error: "Email and password must be provided"});
    }
    UserModel.findOne({email: email}, function(err, existingUser){
       if (err) return next(err);
       if(existingUser)
        res.status(422).send({error: "Email is already exists"});
    });

    const user = new UserModel({
        fullName: fullName,
        gender: gender,
        email: email,
        password: password,
        province: province,
        district: district,
        school: school
    });
    user.save(function(err){
        if (err) {
            return next(err);
        }
        res.json({token: tokenForUser(user)});
    });
};