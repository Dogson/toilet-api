'use strict';
module.exports = function(app) {
    const userRating = require('../controllers/userRating'),
        auth = require('../controllers/auth');

    // toilets Routes
    app.route('/rating')
        .post(auth.isLoggedIn, userRating.create_a_user_rating);
    app.route('/rating/:userRatingId')
        .post(auth.isLoggedIn, userRating.update_a_user_rating)
        .delete(auth.isLoggedIn, userRating.delete_a_user_rating)
};
