'use strict';
module.exports = function (app) {
    const users = require('../controllers/user'),
        auth = require('../controllers/auth');

    // users Routes
    app.route('/users')
        .get(auth.isAuthenticated, users.list_all_users) // TODO delete after testing
        .post(users.create_a_user);

    app.route('/users/:userId')
        .get(auth.isAuthenticated, users.read_a_user)
        .put(auth.isAuthenticated, users.update_a_user)
        .delete(auth.isAuthenticated, users.delete_a_user);
};
