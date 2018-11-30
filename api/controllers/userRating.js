'use strict';
let mongoose = require('mongoose'),
    UserRatings = mongoose.model('UserRating'),
    Ratings = mongoose.model('Rating'),
    Toilets = mongoose.model('Toilet'),
    ObjectId = require('mongoose').Types.ObjectId;


exports.create_a_user_rating = function (req, res) {
    let new_rating = new Ratings(req.body.userRating.rating);
    new_rating.save(function (err, rating) {
        if (err)
            res.send(err);
        let new_user_rating = new UserRatings({
            rating: new ObjectId(rating._id),
            userId: new ObjectId(req.user._id),
            toiletId: req.body.toiletId,
            isMixed: req.body.userRating.isMixed,
            isAccessible: req.body.userRating.isAccessible
        });
        new_user_rating.save(function (err, user_rating) {
            if (err)
                res.send(err);
            exports.update_toilet_rating(req.body.toiletId, res);
        });
    });
};

exports.update_a_user_rating = function (req, res) {
    let userRating = req.body.userRating;
    Ratings.findOneAndUpdate({_id: userRating.rating._id}, userRating.rating, function (err, result) {
        if (err)
            res.send(err);
        UserRatings.findOneAndUpdate({_id: req.body.userRating._id}, {
            $set: {
                isMixed: userRating.isMixed,
                isAccessible: userRating.isAccessible
            }
        }, function (err, result) {
            if (err)
                res.send(err);
            exports.update_toilet_rating(req.body.toiletId, res);
        });
    });
};

exports.update_toilet_rating = function (toiletId, res) {
    //get all user rating and compute new average
    UserRatings.find({toiletId: toiletId}).populate('rating').exec(function (err, user_ratings) {
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


        Toilets.findOneAndUpdate({_id: toiletId},
            {$set: {ratingCount: ratingCount}},
            function (err, toilet) {
                if (err)
                    res.send(err);
                if (ratingCount > 0) {
                    Ratings.findOneAndUpdate({_id: new ObjectId(toilet.rating)}, globalRating, {
                        new: true,
                        upsert: true,
                        returnNewDocument: true,
                        returnOriginal: false
                    }, function (err, rating) {
                        if (rating._id !== toilet.rating) {
                            //new rating created
                            Toilets.findOneAndUpdate({_id: toiletId}, {$set: {rating: new ObjectId(rating._id)}}, function (err, toilet_updated) {
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
                }
                else {
                    res.json(toilet);
                }
            });
    });
};

exports.delete_a_user_rating = function (req, res) {
    UserRatings.findOne({
        _id: ObjectId(req.params.userRatingId),
        userId: ObjectId(req.user.id)
    }, function (err, userRating) {
        if (err)
            res.send(err);
        if (!userRating) {
            res.send({error: "fail"});
        }
        UserRatings.deleteOne({_id: req.params.userRatingId}, function (err) {
            if (err)
                res.send(err);
            Ratings.deleteOne({_id: userRating.rating}, function (err) {
                if (err)
                    res.send(err);
                const toiletId = userRating.toiletId;
                exports.update_toilet_rating(toiletId, res);
            })
        });
    });
};

