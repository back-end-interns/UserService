var jsonWT = require ('jsonwebtoken'); //used to create, sign, and verify tokens
const {secret} = require ('../config/token')//refer to config token

function verifyToken(req, res, next){

    //check header or url parameters or post parameters for tokens
    var token = req.headers['tok'];
    if(!token)
        return res.status(403).send({auth: false, message: 'No token provided.'});
    
    // verifies secret and checks exp
    jsonWT.verify(token, secret, function(err, decoded){
        if(err)
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        
        // if everything is good, save to request for use in other routes
        req.id = decoded.id;
        next();
    })
}

module.exports = verifyToken;
