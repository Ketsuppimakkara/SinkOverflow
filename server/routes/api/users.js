const { json } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../../database.js');

/* GET user by userId. UserId gets supplied in a query */
// Example API call: http://localhost:3001/api/users?id=2. This returns user with id 2.
router.get('/', function(req, res, next) {

  res.header('Access-Control-Allow-Origin',"http://localhost:3000")       //Set header to allow react to access cross-origin resources, here the frontend is running on port 3000 

  const query = "SELECT * FROM User WHERE userId = ?"
  const params = [req.query.userId]                       //We take the database search item from a url query
  db.get(query,params,(err,row)=>{
    if(err){
      res.status(400).json({error:err.message});
      return;
    }
    else{
      if(!row){
        res.status(404).json({"message":"notfound"})
      }
      else{
        res.status(200).json({
          "message":"success",
          "data":row
        });
      }
    }
  })
});

module.exports = router;
