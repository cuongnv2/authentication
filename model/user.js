/**
 * Created by cuongnguyen on 8/13/20.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: String,
    gender: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    province: {
        type: mongoose.ObjectId,
        ref: 'province',
    },
    district: {
        type: mongoose.ObjectId,
        ref: 'district'
    },
    school: {
        type: mongoose.ObjectId,
        ref: 'school'
    }
});

userSchema.pre('save', function(next){
    user = this;
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err1, hash){
            if(err1) return next(err1);
            user.password = hash;
        });
    });
    return next();
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
