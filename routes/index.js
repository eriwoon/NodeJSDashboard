var express = require('express');
var router = express.Router();
var myoracle = require('../src/myoracle');
var fs = require('fs');

var connectData = null;
var connected   = false;
/* GET home page. */

function welcomepage(req, res) {
	res.render('WelcomePage', { title: connectData.username });

	var querystatement;
	//generate data files
	//read query statement and query them, then save them into a file
	console.log("hello world1");
	fs.readFile('./public/resource/oracle_statements.json','utf8', function (err, data) {
  		if (err) throw err;
  		
  		var a = ['a', 'b', 'c'];
  		for(var i in a){
  			console.log(i);
  		}


  		var s = JSON.parse(data);
  		console.log(s);
  		console.log(s.tables);
  		for(var i in s.tables){
  			console.log(s.tables[i].querystatement);
  			myoracle.query(connectData, s.tables[i].querystatement, 
			function(result){
				//Save the query result to file
				console.log(result);
			},
			function(err){
				console.log("Query failed:", err); 
			}
		);}
	});

	


	

	

}

router.get('/', function(req, res) {
 	if(connected != true)
 	{
		res.render('LoginPage', { title: 'Login Page', status: "please input the information of the server!" });
	}
	else
	{
		console.log("hello world2");
		welcomepage(req, res);
	}
});

router.post('/', function(req,res) {

	connectData = {
	    hostname: req.body.database,
	    port: 1521,
	    database: req.body.listener, // System ID (SID)
	    user: req.body.username,
	    password: req.body.password
	};

	var err;
	myoracle.connectCheck(connectData, 
	function(err, connection) {
        if (err) { 
            res.render('LoginPage', { title: 'Login Page', status: "Error connecting to db:" + err });
            return; 
        }
        else{
        	connected = true;
        }

        connection.close();
        welcomepage(req, res);
    });
	
	
});

module.exports = router;
