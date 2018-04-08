let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let port = 3000;
let passport = require('passport');


mongoose.connect('mongodb://localhost:27017/barbershop');
let db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});


app.use(session({
    secret: 'my word',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + '/public'));


let routes = require('./app/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.send(err.message);
});


// listen on port 3000
app.listen(port, function () {
    console.log(`Express app listening on port ${port}`);
});
