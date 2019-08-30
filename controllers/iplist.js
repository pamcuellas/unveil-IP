const db = require('../models');

function convert( ip ){
    var result = 0;
    ip.split(".").map(Number).forEach( (num, index) => {
        result += ( num * Math.pow(256, (3-index)) );
    });
    return result;
}

//create class
var Iplist = {

    getIPfields: function (req, res) {
        
        var promise = new Promise(
            function(resolve, reject) {
                var ip = convert(req.body.ip); 
                let qry = 'SELECT * FROM iplist WHERE  ? BETWEEN ip_from AND ip_to'; 
                db.query(qry, [ip], 
                    function (error, qryResult, fields) {
                        if (error) {
                            console.log("Error [" + error + "] when running query [" + qry + "]");
                            reject(error);
                        }
                        resolve(qryResult);
                    }
                );
            }
        );

        promise
        .then(function(result) {
            res.send(result);
        }, 
        function(err) {
            res.send(err);
        });
    }
};
module.exports = Iplist;

