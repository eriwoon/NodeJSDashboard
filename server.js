var app = require('./app');

var server = app.listen(8125, function() {
    console.log('Listening on port %d', server.address().port);
});