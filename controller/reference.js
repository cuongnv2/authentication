/**
 * Created by cuongnguyen on 8/19/20.
 */
const provinceModel = require('../model/province');
const districtModel = require('../model/district');
const schoolModel = require('../model/school');

exports.getAllProvinces = function(req, res, next) {
    provinceModel.find({}, 'name', function(error, provinces) {
       if(error) return next(error);
       return res.send({ provinces: provinces });
    });
};

exports.getDistrictByProvinceId = function(req, res, next) {
    const provinceId = req.params.provinceId;
    districtModel.find({province: provinceId}, 'name', function(error, districts){
        if(error) return next(error);
        return res.send({ districts: districts });
    });
};

exports.getSchoolByDistrictId = function(req, res, next) {
    const districtId = req.params.districtId;
    schoolModel.find({district: districtId}, 'name', function(error, schools){
        if(error) return next(error);
        return res.send({ schools: schools });
    });
};

