'use strict';
module.exports = function(app) {
    const toilets = require('../controllers/toilet'),
        auth = require('../controllers/auth');

    // toilets Routes
    app.route('/toilets')
        .get(toilets.list_toilets)
        .post(toilets.create_a_toilet);

    app.route('/toilets/:toiletId')
        .get(toilets.read_a_toilet)
        .put(toilets.update_a_toilet)
        .delete(toilets.delete_a_toilet);
};
