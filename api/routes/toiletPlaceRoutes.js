'use strict';
module.exports = function(app) {
    const toiletPlaces = require('../controllers/toiletPlaces'),
    auth = require('../controllers/auth');

    // toilets Routes
    app.route('/places')
        .get(toiletPlaces.list_all_places)
        .post(auth.isAuthenticated, toiletPlaces.create_a_place);

    app.route('/places/:placeId')
        .get(auth.isAuthenticated, toiletPlaces.read_a_place)
        .put(auth.isAuthenticated, toiletPlaces.update_a_place)
        .delete(auth.isAuthenticated, toiletPlaces.delete_a_place);
};
