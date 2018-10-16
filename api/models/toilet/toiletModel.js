'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


let ToiletSchema = new Schema({
    place: {
      type: ObjectId,
      ref: "ToiletPlace"
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