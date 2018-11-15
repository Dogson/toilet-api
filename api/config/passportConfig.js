const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const jwt_secret = process.env.JWT_SECRET;
const User = mongoose.model("User");


// Serialize
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// Deserialize
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        (email, password, done) => {
            User.findOne({email: email}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        errorType: 'Wrong credentials'
                    });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        errorType: 'Wrong credentials'
                    });
                }
                return done(null, user);
            });
        }
    )
);

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt_secret
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findOne({_id: jwtPayload._id})
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));