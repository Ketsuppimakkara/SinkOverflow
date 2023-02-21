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
    query = "SELECT Post.postId, Post.title, Post.content, User.username AS 'author', Post.created_at FROM Post, User WHERE User.userId = Post.userId ORDER BY Post.postId DESC"
    params = []
  }
  else if(req.query.postId){
    query = "SELECT Post.postId, Post.title, Post.content, User.username AS 'author', Post.created_at FROM Post, User WHERE User.userId = Post.userId AND postId = (?)"
    params = [req.query.postId]
  }
  else if(req.query.userId){
    query = "SELECT Post.postId, Post.title, Post.content, User.username AS 'author', Post.created_at FROM Post, User WHERE User.userId = Post.userId AND userId = (?)"
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


//Post route for adding new post
router.post('/', validateJWTToken,function(req, res, next) {
  res.header('Access-Control-Allow-Origin',"*")       //Set header to allow react to access cross-origin resources
        console.log(req.body)
        const query = 'INSERT INTO "Post" (title,content,userId) VALUES (?,?,?)'
        const params = [req.body.title,req.body.content,req.body.userId]
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
