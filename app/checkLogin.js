let user = require('./user');

function checkLogin(req, res, next){
    if (req.body.email_login && req.body.passw_login) {
        user.authenticate(req.body.email_login, req.body.passw_login, function (err, user) {
            if (err || !user) {
                let err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/new');
            }
        });
    }
    else {
        let err = new Error('Fields are empty.');
        err.status = 400;
        return next(err);
    }
}
module.exports = checkLogin;