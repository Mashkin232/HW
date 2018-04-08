let user = require('./user');

function socialData(req,res, next){
    let userData = {
        username: req.user.username,
        email: req.user.email,
        password: "aftersocial"
    };
    user.findOne({'email':req.user.email}, function (err, result) {
        if (err) {
            let err = new Error('Email was not found.');
            err.status = 400;
            return next(err);
        }
        else if (result === null) {
            user.create(userData, function (error, context) {
                if (error) {
                    let err = new Error('User is not created.');
                    err.status = 400;
                    return next(err);
                }
                req.session.userId = context._id;
                return res.redirect('/new');
            })
        }
        else {
            req.session.userId = result._id;
            return res.redirect('/new');
        }
    })
}
module.exports = socialData;