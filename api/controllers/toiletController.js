'use strict';


let mongoose = require('mongoose'),
    Toilet = mongoose.model('Toilets');

exports.list_all_toilets = function(req, res) {
    Toilet.find({}, function(err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};




exports.create_a_toilet = function(req, res) {
    let new_toilet = new Toilet(req.body);
    new_toilet.save(function(err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};


exports.read_a_toilet = function(req, res) {
    Toilet.findById(req.params.toiletId, function(err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};


exports.update_a_toilet = function(req, res) {
    Toilet.findOneAndUpdate({_id: req.params.toiletId}, req.body, {new: true}, function(err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};


exports.delete_a_toilet = function(req, res) {


    Toilet.remove({
        _id: req.params.toiletId
    }, function(err, toilet) {
        if (err)
            res.send(err);
        res.json({ message: 'Toilet successfully deleted' });
    });
};

