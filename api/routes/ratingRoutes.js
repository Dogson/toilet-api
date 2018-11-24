'use strict';
module.exports = function(app) {
    const userRating = require('../controllers/userRating'),
        auth = require('../controllers/auth');

    // toilets Routes
    app.route('/rating')
        .post(auth.isLoggedIn, userRating.create_a_rating);
};
