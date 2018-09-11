let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),

    // Loading created schemas
    Score = require('./api/models/score/scoreModel'),
    Toilet = require('./api/models/toiletModel'),
    ScoreUser = require('./api/models/toiletModel')

    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/toilet_advisor', { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/toiletRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('toilet advisor RESTful API server started on: ' + port);