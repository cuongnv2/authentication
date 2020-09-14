/**
 * Created by cuongnguyen on 8/13/20.
 */
const passport = require('passport');

const authentication = require('./controller/authentication');
const reference = require('./controller/reference');
const user = require('./controller/user');
const tenant = require('./controller/tenant');
const passportService = require('./passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false});

const middleWare = {
    test: function(req, res, next) {
        console.log('Testing...');
        next();
    },
    logger: function(req, res, next) {
        console.log('Original request hit : '+req.originalUrl);
        next();
    }
};


module.exports = function(app) {
    app.get('/', requireAuth, function(req, res, next) {
        console.log('req.user', req.user);
       res.send('All get goes here');
    });

    app.post('/signup', authentication.signup);
    app.post('/signin', requireSignIn, authentication.signin);

    app.get('/provinces', reference.getAllProvinces);
    app.get('/districtByProvinceId/:provinceId', reference.getDistrictByProvinceId);
    app.get('/schoolByDistrictId/:districtId', reference.getSchoolByDistrictId);

    app.get('/users', [middleWare.test, middleWare.logger],  user.getAllUsers);
    app.get('/user/:userId', requireAuth, user.getUserById);
    app.post('/updateUser', requireAuth, user.updateUser);

    app.get('/tenant/:tenantId', requireAuth, tenant.getTenantById);
    app.get('/tenants', requireAuth, tenant.getTenants);
    app.post('/tenant', requireAuth, tenant.updateTenantById);
    app.delete('/tenant/:tenantId', requireAuth, tenant.deleteTenantById);
};