'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let ToiletSchema = new Schema({
    _id: {
        type: String
    },
    ratingCount: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: ObjectId,
        ref: "Rating"
    },
    isAccessible: {
        type: Boolean
    },
    isMixed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Toilet', ToiletSchema);