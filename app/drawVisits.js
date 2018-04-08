let user = require('./user');
let book = require('./book')
let fs = require('fs');

function drawVisits(req, res, next) {
    user.findById(req.session.userId, function (err,user) {
        if (err) {
            let err = new Error('Session has been destroyed.');
            err.status = 400;
            return next(err);
        } else {
            if (user === null) {
                let err = new Error('Not authorized! Go back and try again!');
                err.status = 400;
                return next(err);
            } else {
                let query = book.find({'email': user.email}).select({_id:0, booking_date: 1, reservation_time: 1, message: 1});
                query.exec(function (err, content) {
                    if (err) {
                        let err = new Error('Email was not found.');
                        err.status = 400;
                        return next(err);
                    }else {
                        let htmlData = fs.readFileSync('./public/account.html', 'utf8');
                        let template = `var data = [${content}]`;
                        htmlData.replace(/{\s*data\s*}/, template);
                        res.send(htmlData.replace(/{\s*data\s*}/, template))
                    }
                })
            }
        }
    })
}
module.exports = drawVisits;