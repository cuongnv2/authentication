/**
 * Created by cuongnguyen on 8/21/20.
 */
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const schoolSchema = new Schema({
    name: String,
    schoolType: String,
    district: mongoose.ObjectId,
});

const schoolModel = mongoose.model('school', schoolSchema);

module.exports = schoolModel;