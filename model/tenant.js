/**
 * Created by cuongnguyen on 9/8/20.
 */
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const teantSchema = new Schema({
    fullName: String,
    phone: String,
    from: String,
    relationship: String,
});

const teantModel = mongoose.model('tenant', teantSchema);

module.exports = teantModel;