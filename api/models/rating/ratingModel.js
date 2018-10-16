'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let RatingSchema = new Schema({
    global: {
        type: Number,
        min: 0,
        max: 5
    },
    decoration: {
        type: Number,
        min: 0,
        max: 5
    },
    touch: {
        type: Number,
        min: 0,
        max: 5
    },
    clean: {
        type: Number,
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model('Rating', RatingSchema);