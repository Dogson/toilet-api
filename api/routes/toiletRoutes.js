'use strict';
module.exports = function(app) {
    const toilets = require('../controllers/toilet'),
    auth = require('../controllers/auth');

    // toilets Routes
    app.route('/toilets')
        .get(toilets.list_all_toilets)
        .post(auth.isAuthenticated, toilets.create_a_toilet);

    app.route('/toilets/:toiletId')
        .get(auth.isAuthenticated, toilets.read_a_toilet)
        .put(auth.isAuthenticated, toilets.update_a_toilet)
        .delete(auth.isAuthenticated, toilets.delete_a_toilet);
};
