'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let ToiletSchema = new Schema({
    _id: {
        type: String
    },
    placeName: {
        type: String,
        required: 'The place name must be specified'
    },
    placeType: {
        type: String,
        required: 'The place type must be specified'
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