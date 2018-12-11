'use strict';
let mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    Toilets = mongoose.model('Toilet'),
    UserRatings = mongoose.model('UserRating'),
    specCharHelper = require('../helpers/specCharHelper');

exports.create_a_toilet = function (req, res) {
    let new_toilet = new Toilets(req.body);
    new_toilet.save(function (err, toilet) {
        if (err)
            res.send(err);
        res.json(toilet);
    });
};

exports.read_a_toilet = function (req, res) {
    Toilets.aggregate([
        {
            $match: {
                _id: req.params.toiletId
            }
        },
        {
            $lookup: {
                from: "userratings",
                localField: "_id",
                foreignField: "toiletId",
                as: "userRating",
            }
        },
        {
            "$addFields": {
                "userRating": {
                    "$arrayElemAt": [
                        {
                            "$filter": {
                                "input": "$userRating",
                                "as": "rat",
                                "cond": {
                                    "$eq": ["$$rat.userId", req.user._id]
                                }
                            }
                        }, 0
                    ]
                }
            }
        }]).exec(function (err, docs) {
        Toilets.populate(docs, [{path: 'rating'}, {
            path: 'userRating.rating',
            model: 'Rating'
        }], function (err, toilets) {
            if (err)
                res.send(err);
            let toilet = toilets.length > 0 ? toilets[0] : null;
            if (toilet && toilet.ratingCount < 1) {
                toilet.rating = null;
            }
            res.json(toilet);
        });
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


