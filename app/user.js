let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.statics.authenticate = function (email, password, callback) {
    user.findOne({ email: email },function (err, user) {
        if (err) {
            let err = new Error('Email was not found.');
            err.status = 400;
            return callback(err);
        } else if (!user) {
            let err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    });
};

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            let err = new Error('Password was not hashed.');
            err.status = 400;
            return next(err);
        }
        user.password = hash;
        next();
    })
});


let user = mongoose.model('user', userSchema);
module.exports = user;