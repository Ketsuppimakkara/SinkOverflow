const { json } = require('express');
var express = require('express');
var router = express.Router();
var validateJWTToken = require('../../validateJWTToken')
var db = require('../../database.js');


/*Get route takes the following queries:
  ?min=1&max=10 - Returns current scores of posts between ids 1 and 10
  ?postId=5     - Returns score of post with id 5
  ?userid=3     - Returns all votes user with id 3 has made
  no query      - Returns the current score of all posts
*/
router.get('/', function(req, res, next) {

  res.header('Access-Control-Allow-Origin',"http://localhost:3000")       //Set header to allow react to access cross-origin resources
  let query = ""
  let params = []

  if(req.query.min && req.query.max){
    query = "SELECT postId, sum(voteScore) AS voteScore from 'Postvote' WHERE postId BETWEEN (?) AND (?) GROUP BY postId"
    params = [req.query.min,req.query.max]
  }
  else if(!req.query.userId && !req.query.postId){
    query = "SELECT postId, sum(voteScore) AS voteScore from 'PostVote' GROUP BY postId"
    params = [req.query.postId]
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


/*Post route for adding new votes. 
Request body must include postId and userId and the vote value: +1 or -1
*/
router.post('/', validateJWTToken,function(req, res, next) {
  res.header('Access-Control-Allow-Origin',"*")       //Set header to allow react to access cross-origin resources
        let query = ""
        let params = []
        if(req.body.voteScore === "-1"){
          query1 = 'INSERT INTO PostVote (postId,userId,voteScore) values ((?),(?),-1) ON CONFLICT (postUserId) DO UPDATE SET voteScore=(SELECT IIF(((SELECT voteScore From PostVote WHERE postUserId = (?)||(?))<0),0,-1));'
          params1 = [req.body.postId,req.body.userId,req.body.postId,req.body.userId]

          /* query1 handles downvotes. If the user tries to downvote on a post they have already voted down on, their score gets reset (Undoes previous downvote) */

          query2 = 'UPDATE post SET voteScore = (SELECT sum(voteScore) FROM postVote WHERE postId =(?)) WHERE postId = (?); '
          params2 = [req.body.postId,req.body.postId]

          /* query2 updates the post's vote score in the Post table */
        }
        else if(req.body.voteScore === "+1"){
          query1 = 'INSERT INTO PostVote (postId,userId,voteScore) values ((?),(?),+1) ON CONFLICT (postUserId) DO UPDATE SET voteScore=(SELECT IIF(((SELECT voteScore From PostVote WHERE postUserId = (?)||(?))>0),0,+1));'
          params1 = [req.body.postId,req.body.userId,req.body.postId,req.body.userId]

          /* query1 handles upvotes. If the user tries to upvote on a post they have already voted up on, their score gets reset (Undoes previous upvote) */

          query2 = 'UPDATE post SET voteScore = (SELECT sum(voteScore) FROM postVote WHERE postId =(?)) WHERE postId = (?); '
          params2 = [req.body.postId,req.body.postId]

          /* query2 updates the post's vote score in the Post table */
        }
        db.run(query1,params1,(err)=>{
          if(err){
            res.status(400).json({error:err.message});
          }
          else{
            db.run(query2,params2,(err)=>{
              if(err){
                res.status(400).json({error:err.message});
              }
              else{
                res.status(200).json({message:"success"});
              }
        })
    }
  }
  )}
);



module.exports = router;
