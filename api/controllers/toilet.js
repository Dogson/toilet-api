'use strict';
let mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    Toilets = mongoose.model('Toilet');

exports.list_toilets = function (req, res) {
    const toiletPlaceId = req.query.toiletPlaceId;
    let query;
    if (toiletPlaceId) {
        query = {place: new ObjectId(toiletPlaceId)};
    }
    Toilets.find(query).populate('rating').exec(function (err, toilets) {
        if (err)
            res.send(err);
        res.json(toilets);
    });
};

exports.create_a_toilet = function (req, res) {
    let new_toilet = new Toilets(req.body);
    new_toilet.save(function (err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};

exports.read_a_toilet = function (req, res) {
    Toilets.findById(req.params.toiletId, function (err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};


exports.update_a_toilet = function (req, res) {
    Toilets.findOneAndUpdate({_id: req.params.toiletId}, req.body, {new: true}, function (err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};


exports.delete_a_toilet = function (req, res) {
    Toilets.remove({
        _id: req.params.toiletId
    }, function (err, toilet) {
        if (err)
            res.send(err);
        res.json({message: 'Toilet successfully deleted'});
    });
};

