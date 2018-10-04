'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let ToiletSchema = new Schema({
    placeId: {
        type: String,
        required: 'The Google Places id of place where the toilet is located must be specified'
    },
    placeName: {
        type: String,
        required: 'The place name must be specified'
    },
    placeType: {
        type: String,
        required: 'The place type must be specified'
    },
    globalScore: {
        type: Number,
        min: 0,
        max: 5
    },
    score: {
        type: ObjectId,
        ref: "Score"
    },
    gender: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Toilet', ToiletSchema);