'use strict';
let mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    Toilets = mongoose.model('Toilet'),
    UserRatings = mongoose.model('UserRating'),
    specCharHelper = require('../helpers/specCharHelper');

exports.list_toilets = function (req, res) {
    let searchKey = req.query.q;
    const specCharSearchKey = specCharHelper.make_pattern(searchKey);
    const partialSearchKey = new RegExp(searchKey, 'i');
    if (specCharSearchKey) {
        searchKey = new RegExp(specCharSearchKey.source + "|" + partialSearchKey.source);
    }
    else {
        searchKey = partialSearchKey;
    }
    Toilets.aggregate([
        {
            $match: {
                placeName: searchKey
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
            const toiletsMapped = _mapToilets(toilets);
            res.json(toiletsMapped);

        });
    });

    function _mapToilets(toilets) {
        return toilets.map((_toilet) => {
            let toilet = {};
            toilet._id = _toilet._id;
            toilet.placeType = _toilet.placeType;
            toilet.placeName = _toilet.placeName;
            toilet.placeId = _toilet.placeId;
            toilet.ratingCount = _toilet.ratingCount;
            toilet.rating = toilet.ratingCount > 0 && _toilet.rating;
            toilet.userRating = _toilet.userRating;
            toilet.isMixed = _toilet.isMixed;
            toilet.isAccessible = _toilet.isAccessible;

            return toilet;
        });
    }
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
            let toilet = toilets.length > 0 && toilets[0];
            toilet.rating = toilet.ratingCount > 0 && toilet.rating;
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


