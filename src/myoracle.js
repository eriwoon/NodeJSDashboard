var oracle = require('oracle');

exports.connectCheck = function(connectData, callback){
    oracle.connect(connectData, callback);
}

exports.query = function(err, connectData, querystatement,callback){
    oracle.connect(connectData, 
        function(err, connection) { 
            if (err) {return;}
            connection.execute( querystatement, [], function(err, results) {
                connection.close();
                if (err) {return;}
                callback(results);
            });
        }
    );
}