'use strict';
let mongoose = require('mongoose'),
    UserRatings = mongoose.model('UserRating'),
    Ratings = mongoose.model('Rating'),
    Toilets = mongoose.model('Toilet'),
    ObjectId = require('mongoose').Types.ObjectId;


exports.create_a_rating = function (req, res) {
    let new_rating = new Ratings(req.body.userRating.rating);
    new_rating.save(function (err, rating) {
        if (err)
            res.send(err);
        let new_user_rating = new UserRatings({
            rating: new ObjectId(rating._id),
            userId: new ObjectId(req.user._id),
            toiletId: new ObjectId(req.body.toiletId),
            hasMixtToilets: req.body.hasMixtToilets,
            hasHandicappedToilets: req.body.hasHandicappedToilets
        });
        new_user_rating.save(function (err, user_rating) {
            if (err)
                res.send(err);
            exports.update_toilet_rating(req, res);
        });
    });
};

exports.update_toilet_rating = function (req, res) {
    //get all user rating and compute new average
    UserRatings.find({toiletId: new ObjectId(req.body.toiletId)}).populate('rating').exec(function (err, user_ratings) {
        let ratingCount = 0;
        let globalRating = {
            global: 0,
            cleanliness: 0,
            functionality: 0,
            decoration: 0,
            value: 0
        };

        user_ratings.forEach((user_rating) => {
            let rating = user_rating.rating;
            if (rating && rating.global) {
                ratingCount++;

                globalRating = {
                    global: (globalRating.global * (ratingCount - 1) + rating.global) / ratingCount,
                    cleanliness: (globalRating.cleanliness * (ratingCount - 1) + rating.cleanliness) / ratingCount,
                    functionality: (globalRating.functionality * (ratingCount - 1) + rating.functionality) / ratingCount,
                    decoration: (globalRating.decoration * (ratingCount - 1) + rating.decoration) / ratingCount,
                    value: (globalRating.value * (ratingCount - 1) + rating.value) / ratingCount,
                }
            }
        });

        if (ratingCount > 0) {
            Toilets.findOneAndUpdate({_id: new ObjectId(req.body.toiletId)},
                {$set: {ratingCount: ratingCount}},
                function (err, toilet) {
                    if (err)
                        res.send(err);
                    Ratings.findOneAndUpdate({_id: new ObjectId(toilet.rating)}, globalRating, {new: true, upsert: true, returnNewDocument: true, returnOriginal: false}, function (err, rating) {
                        if (rating._id !== toilet.rating) {
                            //new rating created
                            Toilets.findOneAndUpdate({_id: new ObjectId(req.body.toiletId)}, {$set: {rating: new ObjectId(rating._id)}}, function(err, toilet_updated) {
                                if (err)
                                    res.send(err);
                                res.json(toilet_updated);
                            });
                        }
                        else {
                            if (err)
                                res.send(err);
                            res.json(toilet);
                        }
                    });
                });
        }


    });
};


exports.update_a_place = function (req, res) {
    UserRatings.findOneAndUpdate({
        toiletId: req.params.toiletId,
        userId: req.user._id
    }, req.body, {new: true}, function (err, toiletPlace) {
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

