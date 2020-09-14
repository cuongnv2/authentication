/**
 * Created by cuongnguyen on 9/8/20.
 */
const mongoose = require('mongoose');
const tenantModel = require('../model/tenant');

exports.getTenants = function(req, res, next) {
    tenantModel.find({}, function(err, tenants) {
       if(err) return next(err);
       return res.send({tenants: tenants});
    });
};

exports.getTenantById = function(req, res, next) {
    const tenantId = req.params.tenantId;

    tenantModel.findById({_id: tenantId}, function(err, tenant) {
        if(err) return next(err);

        return res.send({tenant: tenant});
    });
};

exports.updateTenantById = function(req, res, next){
  const idUsedOnInsert = new mongoose.Types.ObjectId;
  const tenantId = req.body.id || idUsedOnInsert;
  const fullName = req.body.fullName;
  const phone = req.body.phone || '';
  const from = req.body.from || '';
  const relationship = req.body.relationship || '';

  tenantModel.findByIdAndUpdate({_id: tenantId},
      { fullName: fullName, phone: phone, relationship: relationship, from : from },
      { upsert: true, new: true , setOnInsert: { _id: idUsedOnInsert }},
      function(err, tenant){
        if(err) return next(err);
        res.send({tenant: tenant});
      });
};

exports.deleteTenantById = function(req, res, next) {
  console.log('req', req.params);
  const tenantId = req.params.tenantId;

  tenantModel.deleteOne({ _id: tenantId}, function(err) {
     if(err) return next(err);
     return res.send({});
  });
};