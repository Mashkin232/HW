let passport = require('passport');
let GoogleStrategy = require("passport-google-oauth20").Strategy;
let VKontakteStrategy = require('passport-vkontakte').Strategy;


passport.use('google', new GoogleStrategy({
        clientID: "930050305484-njid11idp3t2kb9977colpbnihuo5bb0.apps.googleusercontent.com",
        clientSecret: "Ot6ESN53iH9WhNOLyeDM0xVv",
        callbackURL: "http://localhost:3000/auth/google/callback",
        scope: ['email'],
        profileFields: ['email']
    },

    function (accessToken, refreshToken, profile, done) {

        return done(null, {
            username: profile.displayName,
            email: profile.emails[0].value
        })
    }
));

passport.use('vkontakte', new VKontakteStrategy({
        clientID:"6440938",
        clientSecret: "X7zwXCkhT0HWy4IaVTnA",
        callbackURL:  "http://localhost:3000/auth/vkontakte/callback",
        scope: ['email'],
        profileFields: ['email']
    },
    function (accessToken, refreshToken,  params, profile, done) {

        return done(null, {
            username: profile.displayName,
            email:params.email
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (user, done) {
    try {
        done(null, JSON.parse(user));
    } catch (err) {
        done(err)
    }
});
