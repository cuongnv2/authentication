/**
 * Created by cuongnguyen on 8/19/20.
 */
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const provinceSchema = new Schema({
   name: { type: String, required: true }
});

const provinceModel = mongoose.model('province', provinceSchema);

module.exports = provinceModel;