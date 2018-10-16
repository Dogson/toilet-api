'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let ToiletPlaceSchema = new Schema({
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
    }
});

module.exports = mongoose.model('ToiletPlace', ToiletPlaceSchema);