var express = require('express');
var router = express.Router();
var myoracle = require('../src/myoracle');


var connectData = null;
var connected   = false;
/* GET home page. */
router.get('/', function(req, res) {
 	if(connected != true)
 	{
		res.render('LoginPage', { title: 'Login Page', status: "please input the information of the server!" });
	}
	else
	{
		res.render('WelcomePage', { title: connectData.username });
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

	console.log(req.body.database, req.body.listener, req.body.username, req.body.password);

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
        res.render('WelcomePage', { title: connectData.username });
    });
	
	
});

module.exports = router;
