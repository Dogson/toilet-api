'use strict';
let specCharHelper = require('../helpers/specCharHelper');
let mongoose = require('mongoose'),
    Toilet = mongoose.model('Toilet');

exports.list_all_toilets = function (req, res) {
    let searchKey = req.query.q;
    const specCharSearchKey = specCharHelper.make_pattern(searchKey);
    const partialSearchKey = new RegExp(searchKey, 'i');
    if (specCharSearchKey) {
        searchKey = new RegExp(specCharSearchKey.source + "|" + partialSearchKey.source);
    }
    else {
        searchKey = partialSearchKey;
    }
    const searchQuery = {placeName: searchKey};

    Toilet.find(searchQuery, function (err, toilets) {
        if (err)
            res.send(err);
        res.json(toilets);
    });
};

exports.create_a_toilet = function (req, res) {
    let new_toilet = new Toilet(req.body);
    new_toilet.save(function (err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};


exports.read_a_toilet = function (req, res) {
    Toilet.findById(req.params.toiletId, function (err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};


exports.update_a_toilet = function (req, res) {
    Toilet.findOneAndUpdate({_id: req.params.toiletId}, req.body, {new: true}, function (err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};


exports.delete_a_toilet = function (req, res) {


    Toilet.remove({
        _id: req.params.toiletId
    }, function (err, toilet) {
        if (err)
            res.send(err);
        res.json({message: 'Toilet successfully deleted'});
    });
};

