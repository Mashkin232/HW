function logout(req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                let err = new Error('Session was not found.');
                err.status = 400;
                return next(err);
            } else {
                return res.redirect('index.html');
            }
        });
    }
}

module.exports = logout;