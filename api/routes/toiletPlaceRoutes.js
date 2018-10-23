'use strict';
module.exports = function(app) {
    const toiletPlaces = require('../controllers/toiletPlaces'),
    auth = require('../controllers/auth');

    // toilets Routes
    app.route('/places')
        .get(auth.isLoggedIn, toiletPlaces.list_all_places)
        .post(auth.isLoggedIn, toiletPlaces.create_a_place);

    app.route('/places/:placeId')
        .get(auth.isLoggedIn, toiletPlaces.read_a_place)
        .put(auth.isLoggedIn, toiletPlaces.update_a_place)
        .delete(auth.isLoggedIn, toiletPlaces.delete_a_place);
};
