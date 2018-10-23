'use strict';
module.exports = function(app) {
    const auth = require('../controllers/auth');

    // auth routes
    app.route('/login')
        .post(auth.login);

    app.route('/register')
        .post(auth.register);
};
