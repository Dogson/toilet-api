'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let ToiletSchema = new Schema({
    place: {
      type: ObjectId,
      ref: "ToiletPlace"
    },
    globalRating: {
        type: Number,
        min: 0,
        max: 5
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
    gender: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Toilet', ToiletSchema);