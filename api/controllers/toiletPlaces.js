'use strict';
let specCharHelper = require('../helpers/specCharHelper');
let mongoose = require('mongoose'),
    ToiletPlaces = mongoose.model('ToiletPlace');

exports.list_all_places = function (req, res) {
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

    ToiletPlaces.find(searchQuery, function (err, places) {
        if (err)
            res.send(err);
        res.json(places);
    });
};

exports.create_a_place = function (req, res) {
    let new_place = new ToiletPlaces(req.body);
    new_place.save(function (err, place) {
        if (err)
            res.send(err);
        res.json(place);
    });
};


exports.read_a_place = function (req, res) {
    ToiletPlaces.findById(req.params.toiletPlaceId, function (err, toiletPlace) {
        if (err)
            res.send(err);
        res.json(toiletPlace);
    });
};


exports.update_a_place = function (req, res) {
    ToiletPlaces.findOneAndUpdate({_id: req.params.toiletPlaceId}, req.body, {new: true}, function (err, toiletPlace) {
        if (err)
            res.send(err);
        res.json(toiletPlace);
    });
};


exports.delete_a_place = function (req, res) {


    ToiletPlaces.remove({
        _id: req.params.toiletPlaceId
    }, function (err, toiletPlace) {
        if (err)
            res.send(err);
        res.json({message: 'ToiletPlaces successfully deleted'});
    });
};

