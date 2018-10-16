'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let RatingUserSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: "User id must be specified"
    },
    toiletId: {
        type: ObjectId,
        ref: "Toilet",
        required: "Toilet id must be specified"
    },
    rating: {
        type: ObjectId,
        ref: "Rating"
    }
});

module.exports = mongoose.model('RatingUser', RatingUserSchema);