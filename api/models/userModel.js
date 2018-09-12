'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
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
    }
});

module.exports = mongoose.model('User', UserSchema);