const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser');

    // Loading created schemas
    require('./api/models/rating/ratingModel');
    require('./api/models/toilet/toiletPlaceModel');
    require('./api/models/userModel');
    require('./api/models/toilet/toiletModel');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/toilet_advisor', {useNewUrlParser: true});

// load bodyparser package
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// load passport package
app.use(passport.initialize());

// Loading routes
require('./api/routes/toiletPlaceRoutes')(app);
require('./api/routes/toiletRoutes')(app);
require('./api/routes/userRoutes')(app);


app.listen(port);


console.log('toilet advisor RESTful API server started on: ' + port);