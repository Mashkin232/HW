let express = require('express');
let router = express.Router();
let passport = require('passport');
let socialData = require('./socialData');
let createBook = require('./createBook');
let createUser = require('./createUser');
let checkLogin = require('./checkLogin');
let drawVisits = require('./drawVisits');
let deleteVisits = require('./deleteVisits');
let logout = require('./logout')
require('./social');


router.get('/', function (req, res) {
    return res.sendFile(path.join(__dirname + 'index.html'));
});

router.post('/book', createBook);

router.post('/sign_up', createUser);

router.post('/sign_in', checkLogin);

//route after registering
router.get('/new', drawVisits);

router.post('/delete', deleteVisits);


//----SOCIAL NETWORKS
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/after_social',
        failureRedirect: '/' })
);
router.get('/auth/vkontakte', passport.authenticate('vkontakte'));

router.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/after_social',
        failureRedirect: '/'
    })
);

router.get('/after_social', socialData);
//----SOCIAL NETWORKS


router.get('/logout', logout);

module.exports = router;


