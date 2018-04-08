let book = require('./book');

function createBook(req, res, next){
    if (req.body.senderName &&
        req.body.senderEmail &&
        req.body.senderPhone &&
        req.body.bookingDate &&
        req.body.reservationTime &&
        req.body.message) {

        let oldDate = req.body.bookingDate;
        let newDate = oldDate.replace(/^(\d{2}).(\d{2}).(\d{4})/,'$3-$2-$1');
        let newDateDb= newDate.toString();

        let bookingData = {
            username: req.body.senderName,
            email: req.body.senderEmail,
            phone: req.body.senderPhone,
            booking_date: newDateDb,
            reservation_time: req.body.reservationTime,
            message: req.body.message
        };
        book.create(bookingData, function (err, cb) {
            if (err) {
                let err = new Error('Book is not created.');
                err.status = 400;
                return next(err);
            }
            return res.redirect('back');
        });
    }
    else {
        let err = new Error('Data is empty');
        err.status = 400;
        return next(err);
    }
}
module.exports=createBook;