var oracle = require('oracle');

exports.connectCheck = function(connectData, callback){
    oracle.connect(connectData, callback);
}

exports.query = function( connectData, querystatement ,success_callback, error_callback){
    var err;
    oracle.connect(connectData, 
        function(err, connection) { 
            if (err) {error_callback(err);return;}
            connection.execute( querystatement, [], function(err, results) {
                connection.close();
                if (err) {error_callback(err);return;}
                else success_callback(results);
            });
        }
    );
}