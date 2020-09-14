/**
 * Created by cuongnguyen on 8/22/20.
 */
const userModel = require('../model/user');

exports.getAllUsers = function(req, res, next) {
  userModel.find({}, { fullName: 1, email: 1,
                        province: 1, gender: 1, district : 1, school : 1}
                )
      .populate('province', 'name')
      .populate('district', 'name')
      .populate('school', 'name')
      .exec(function(err, users) {
          if (err) return next(err);
          return res.send({users: users})
      });
};

exports.getUserById = function(req, res, next) {
    const userId = req.params.userId && req.params.userId;

    setTimeout(function() {
        userModel.findById({_id: userId} , { fullName: 1, email: 1,
            province: 1, gender: 1, district : 1, school : 1})
            .populate('province', 'name')
            .populate('district', 'name')
            .populate('school', 'name')
            .exec(
                function(err, user) {
                    if(err) return next(err);
                    return res.send({user: user});
                });
    }, 3000); // Pretend server lag
};

exports.updateUser = function(req, res, next) {
    const id = req.body.userId;
    const fullName = req.body.fullName;
    const province = req.body.provinceId;
    const district = req.body.districtId;
    const school = req.body.schoolId;

    userModel.findByIdAndUpdate({_id: id}, {
                    fullName: fullName,
                    province: province,
                    district: district,
                    school: school }
            , function(err, user){
                if(err) return next(err);
                return res.send({})
        });
};