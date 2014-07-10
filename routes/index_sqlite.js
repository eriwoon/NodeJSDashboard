var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('public/resource/datasource.db');


db.serialize(function() {
	db.each("SELECT * FROM test", function(err, row) {
		var tmp = '';
		for(col in row){
			tmp += (col + ':' + row[col] + ' ' );
		}
    	console.log(tmp);
    });
});

db.close();

router.get('/', function(req, res) {
	res.render('chart', { title: 'chart', status: "chart" });
});


module.exports = router;