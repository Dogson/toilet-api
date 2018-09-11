'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let ScoreUserSchema = new Schema({
    userId: {
        type: String,
        required: "User id must be specified"
    },
    toiletId: {
        type: ObjectId,
        ref: "Toilet",
        required: "Toilet id must be specified"
    },
    score: {
        type: ObjectId,
        ref: "Score"
    }
});

module.exports = mongoose.model('ScoreUser', ScoreSchema);