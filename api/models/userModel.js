'use strict';
const mongoose = require('mongoose');
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const Schema = mongoose.Schema;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    username: {
        type: String,
        required: "username must be specified"
    },
    password: {
        type: String,
        required: "password must be specified"
    },
    email: {
        type: String,
        required: "email must be specified",
        unique: true
    },
    salt: String
});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
    let hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
    return this.password === hash;
};

UserSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            exp: parseInt(expiry.getTime() / 1000)
        },
        jwt_secret
    );
};

module.exports = mongoose.model('User', UserSchema);