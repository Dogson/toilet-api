'use strict';
module.exports = function (app) {
    const users = require('../controllers/user'),
        auth = require('../controllers/auth');

    // users Routes
    app.route('/users')
        .get(users.list_all_users) // TODO delete after testing
        .post(users.create_a_user);

    app.route('/users/:userId')
        .get(auth.isLoggedIn, users.read_a_user)
        .put(auth.isLoggedIn, users.update_a_user)
        .delete(auth.isLoggedIn, users.delete_a_user);
};
