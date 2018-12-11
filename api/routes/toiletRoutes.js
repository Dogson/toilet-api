'use strict';
module.exports = function(app) {
    const toilets = require('../controllers/toilet'),
        auth = require('../controllers/auth');

    // toilets Routes
    app.route('/toilets')
        .post(auth.isLoggedIn, toilets.create_a_toilet);

    app.route('/toilets/:toiletId')
        .get(auth.isLoggedIn, toilets.read_a_toilet)
        .put(auth.isLoggedIn, toilets.update_a_toilet)
        .delete(auth.isLoggedIn, toilets.delete_a_toilet);
};
