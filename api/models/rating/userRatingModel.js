'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let UserRatingSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: "User id must be specified"
    },
    toiletId: {
        type: String,
        ref: "Toilet",
        required: "Toilet id must be specified"
    },
    rating: {
        type: ObjectId,
        ref: "Rating"
    },
    isMixed: {
        type: Boolean
    },
    isAccessible: {
        type: Boolean
    }
});

module.exports = mongoose.model('UserRating', UserRatingSchema);