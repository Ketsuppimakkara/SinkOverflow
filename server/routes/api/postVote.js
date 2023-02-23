const { json } = require('express');
var express = require('express');
var router = express.Router();
var validateJWTToken = require('../../validateJWTToken')
var db = require('../../database.js');



router.get('/', function(req, res, next) {

  res.header('Access-Control-Allow-Origin',"http://localhost:3000")       //Set header to allow react to access cross-origin resources
  let query = ""
  let params = []

  if(!req.query.userId && !req.query.postId){
    res.send(400).json({error:"Invalid query"})
    return
  }
  else if(req.query.postId){
    query = "SELECT sum(voteScore) AS voteScore from 'PostVote' WHERE PostId =  (?)"
    params = [req.query.postId]
  }
  else if(req.query.userId){
    query = "SELECT sum(voteScore) AS voteScore from 'PostVote' WHERE userId =  (?)"
    params = [req.query.userId]
  }

  db.all(query,params,(err,row)=>{
    if(err){
      res.status(400).json({error:err.message});
      return;
    }
    else{
      if(!row){
        res.status(404).json({error:"No posts in database"})
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


//Post route for adding new vote
router.post('/', validateJWTToken,function(req, res, next) {
  res.header('Access-Control-Allow-Origin',"*")       //Set header to allow react to access cross-origin resources
        console.log(req.body)
        let query = ""
        let params = []
        if(req.body.voteScore === "-1"){
          query = 'INSERT INTO PostVote (postId,userId,postUserId, voteScore) values ((?),(?),(?),-1) ON CONFLICT (postUserId) DO UPDATE SET voteScore=(SELECT IIF(((SELECT voteScore From PostVote WHERE postUserId = (?))<0),0,-1))'
          params = [req.body.postId,req.body.userId,(req.body.postId.toString()+req.body.userId.toString()),(req.body.postId.toString()+req.body.userId.toString())]
        }
        else if(req.body.voteScore === "+1"){
          query = 'INSERT INTO PostVote (postId,userId,postUserId, voteScore) values ((?),(?),(?),+1) ON CONFLICT (postUserId) DO UPDATE SET voteScore=(SELECT IIF(((SELECT voteScore From PostVote WHERE postUserId = (?))>0),0,+1))'
          params = [req.body.postId,req.body.userId,(req.body.postId.toString()+req.body.userId.toString()),(req.body.postId.toString()+req.body.userId.toString())]
        }
        db.run(query,params,(err)=>{
          if(err){
            res.status(400).json({error:err.message});
          }
          else{
            res.status(200).json({message:"success"});
          }
        })
    }
  );



module.exports = router;
