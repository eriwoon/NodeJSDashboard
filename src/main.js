var myoracle = require('./myoracle'),

connectData = {
    hostname: "10.129.78.159",
    port: 1521,
    database: "ora11g", // System ID (SID)
    user: "system",
    password: "Oracle_1"
};

querystatement="select substr(a.datahour,1,11) as f1,a.nename as f2,round(avg(a.avgnumber)) as f3 from \
(SELECT /*paralell(t,4)*/TO_CHAR((TO_DATE('19700101020000', 'YYYYMMDDHH24MISS') + NUMTODSINTERVAL(T.TIMESTAMP/1000, 'SECOND')),'yyyymmdd hh24mi') AS datahour, \
NVL(SUBSTR(S.NAME,12,20),T.DN) as nename, \
sum(t.hwsesconcurrencynum) as avgnumber \
 \
FROM OMSPM.dt_hwperfdiamet2126485019 T LEFT JOIN IEMPEAM.NODE S ON T.DN=S.DN \
 WHERE TO_CHAR((TO_DATE('19700101020000', 'YYYYMMDDHH24MISS') + NUMTODSINTERVAL(T.TIMESTAMP/1000, 'SECOND')),'yyyymmdd')  >to_char(sysdate-1,'yyyymmdd') \
 \
 AND  T.HWEVENTTYPE <>'NA' \
GROUP BY TO_CHAR((TO_DATE('19700101020000', 'YYYYMMDDHH24MISS') + NUMTODSINTERVAL(T.TIMESTAMP/1000, 'SECOND')),'yyyymmdd hh24mi') , \
NVL(SUBSTR(S.NAME,12,20),T.DN) \
) a \
group by substr(a.datahour,1,11),a.nename \
order by substr(a.datahour,1,11),a.nename"


var err;
myoracle.connectCheck(connectData, 
	function(err, connection) {
        if (err) { 
            console.log("Error connecting to db:", err); 
            return; 
        }
        connection.close();
    });


function resultprocess(results){
	console.log(results);
}

myoracle.query(err, connectData, querystatement,resultprocess);
if (err){
	console.log("Query failed:", err); 
	return;
}


