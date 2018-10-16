'use strict';
module.exports = function(app) {
    const toiletPlacess = require('../controllers/toiletPlaces'),
    auth = require('../controllers/auth');

    // toilets Routes
    app.route('/places')
        .get(toiletPlacess.list_all_places)
        .post(auth.isAuthenticated, toiletPlacess.create_a_place);

    app.route('/places/:placeId')
        .get(auth.isAuthenticated, toiletPlacess.read_a_place)
        .put(auth.isAuthenticated, toiletPlacess.update_a_place)
        .delete(auth.isAuthenticated, toiletPlacess.delete_a_place);
};
