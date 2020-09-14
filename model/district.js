/**
 * Created by cuongnguyen on 8/21/20.
 */
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const districtSchema = new Schema({
    name: { type: String },
    province: {
        type: mongoose.Schema.ObjectId,
    }
});

const districtModel = mongoose.model('district', districtSchema);

module.exports = districtModel;




