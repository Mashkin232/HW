let user = require('./user');

function createUser(req,res,next){
    if (req.body.nameSign &&
    req.body.emailSign &&
    req.body.passwSign) {

        let userData = {
            username: req.body.nameSign,
            email: req.body.emailSign,
            password: req.body.passwSign
        };

        user.create(userData, function (err) {
            if (err) {
                let err = new Error('User is not created.');
                err.status = 400;
                return next(err);
            }
            return res.redirect('back');
        });
    } else {
        let err = new Error('Data is empty');
        err.status = 400;
        return next(err);
    }
}
module.exports = createUser;