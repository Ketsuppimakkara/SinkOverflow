const { json } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../../database.js');

/* GET user by id listing. */
router.get('/', function(req, res, next) {

  res.header('Access-Control-Allow-Origin',"http://localhost:3000")       //Set header to allow react to access cross-origin resources

  const query = "SELECT * FROM User WHERE userId = ?"
  const params = [req.query.userId]                       //We take the database search item from a url query, for example http://localhost:3001/api/users?id=2
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
