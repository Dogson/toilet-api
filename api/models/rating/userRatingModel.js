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
        type: ObjectId,
        ref: "Toilet",
        required: "Toilet id must be specified"
    },
    rating: {
        type: ObjectId,
        ref: "Rating"
    },
    hasMixtToilets: {
        type: Boolean
    },
    hasHandicappedToilets: {
        type: Boolean
    }
});

module.exports = mongoose.model('UserRating', UserRatingSchema);