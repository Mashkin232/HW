let book = require('./book');
let user = require('./user');

function deleteVisits (req, res, next) {
    user.findById(req.session.userId, function (err,user) {
        if (err){
            let err = new Error('Session has been destroyed.');
            err.status = 400;
            return next(err);
        }else {
            if (user === null) {
                let err = new Error('Not authorized! Go back and try again!');
                err.status = 400;
                return next(err);
            } else {
                book.find({'email': user.email}, function (err, content) {
                    if (err) {
                        let err = new Error('Email was not found.');
                        err.status = 400;
                        return next(err);
                    }else {
                        let dataDelete = req.body.click_button.split(/\s/)
                        book.deleteOne({booking_date:dataDelete[0], reservation_time:dataDelete[1], message:dataDelete[2]}, function (err) {
                            if (err) {
                                let err = new Error('Data was not deleted.');
                                err.status = 400;
                                return next(err);
                            }
                            return res.redirect('/new');
                        })
                    }
                })
            }
        }
    })
}
module.exports=deleteVisits;