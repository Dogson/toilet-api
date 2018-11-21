// Load required packages
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/userModel');

exports.register = async (req, res, next) => {
    const user = new User();

    user.username = req.body.username;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    try {
        await user.save();
        const token = user.generateJwt();
        res.status(200).json({
            userInfo: user,
            token: token
        });
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.login = (req, res, next) => {
    if (req.user) {
        console.log("user already logged");
    }
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            res.status(401).json(err);
            return;
        }

        if (user) {
            const token = user.generateJwt();

            // used to serialize the user for the session
            req.logIn(user, {session: false}, function (err) {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    userInfo: user,
                    token: token
                });
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res, next);
};

exports.isLoggedIn = (req, res, next) => {
    return passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(400).json({errorType: 'Not logged'});
        }
        else if (user) {
            req.user = user;
            return next();
        }
        else {
            console.log(info);
            res.status(401).json({errorType: 'Not logged'});
        }
    })(req, res, next)
};