'use strict';
let mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    Toilets = mongoose.model('Toilet'),
    UserRatings = mongoose.model('UserRating');

exports.list_toilets = function (req, res) {
    const toiletPlaceId = req.query.toiletPlaceId;
    let query;
    // Toilets.find(query).populate('rating').exec(function (err, toilets) {
    //     let toilets_populated = toilets.map((toilet) => {
    //         let _toilet = {...toilet};
    //         console.log(_toilet);
    //         UserRatings.findOne({toiletId: new ObjectId(toilet._id), userId: req.user._id}).populate('rating').exec(function (err, userRating) {
    //             _toilet.userRating = userRating;
    //         });
    //         if (_toilet.userRating) {
    //             // console.log(_toilet);
    //         }
    //         return _toilet;
    //     });
    //     res.json(toilets_populated);
    // });
    Toilets.aggregate([
        {
            $match: {
                place: new ObjectId(toiletPlaceId)
            }
        },
        {
            $lookup: {
                from: "userratings",
                localField: "_id",
                foreignField: "toiletId",
                as: "userRating"
            }
        },
        {
            $unwind: "$userRating"
        },
        {
            $match: {
                "userRating.userId": ObjectId(req.user.id)
            }
        }]).exec(function (err, docs) {
            console.log(docs);
        Toilets.populate(docs, [{path: 'rating'}], function (err, res) {
            console.log(res);
        });
    })
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

