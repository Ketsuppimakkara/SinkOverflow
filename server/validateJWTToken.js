const jwt = require("jsonwebtoken");


//Middleware that uses JWT to verify a token. Token gets passed in request "authorization" header with a bearer token.
//The secret is in the .env file, make sure you have set a secret there.

module.exports = function(req,res,next) {
    const authHeader = req.headers["authorization"];
    if(authHeader){
        let token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err,user)=>{
            if(err){
                res.status(401).json({error:"Unauthorized",messsage:err.message})
                console.log(err.message)
            }
            else{
                req.body.userId = user.userId
                req.body.author = user.username
                next();
            }
        })
    }
    else{
        return res.status(401).json({error:"Unauthorized"});
    }
};