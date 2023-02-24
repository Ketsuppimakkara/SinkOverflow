const { json } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../../database.js');
var validateJWTToken = require('../../validateJWTToken')

/* GET post's comments by posts' id listing. 
Takes url queries:
?postId=4   - Returns comments from post with id of 4
?userId=2   - Returns comments made by user with id of 2
no query    - Returns all comments from all posts
*/
router.get('/', function(req, res, next) {

  res.header('Access-Control-Allow-Origin',"*")       //Set header to allow react to access cross-origin resources
  let query = ""                                      //We will construct the query based on parameters
  let params = []

  if(!req.query.userId && !req.query.postId){
    query = "SELECT * FROM Comment"
    params = []
  }
  else{                   
    if(req.query.postId){
      query = "SELECT commentId, content, username AS 'author', created_at FROM COMMENT LEFT JOIN USER ON Comment.userId = User.userId WHERE Comment.PostId = (?)"
      params = [req.query.postId]
    }
    if(req.query.userId){
      query =  "SELECT * FROM Post WHERE userId = (?)"
      params = [req.query.postId]
    }
  }
  db.all(query,params,(err,row)=>{
    if(err){
      res.status(400).json({error:err.message});
      return;
    }
    else{
        res.status(200).json({
          "message":"success",
          "data":row
        });
      }
    }
  )
});

/* GET all comments from all posts if you need to for some reason */
router.get('/', function(req, res, next) {

  res.header('Access-Control-Allow-Origin',"http://localhost:3000")       //Set header to allow react to access cross-origin resources

  const query = "SELECT * FROM Comment"
  const params = [req.params]
  db.all(query,params,(err,row)=>{
    if(err){
      res.status(400).json({error:err.message});
      return;
    }
    else{
        res.status(200).json({
          "message":"success",
          "data":row
        });
      }
    }
  )
});


/*Post route for adding new comment 
Body must include postId, userId, and content 
*/
router.post('/',validateJWTToken, function(req, res, next) {
  res.header('Access-Control-Allow-Origin',"*")       //Set header to allow react to access cross-origin resources

        const query = 'INSERT INTO "Comment" (content,userId,postId) VALUES (?,?,?)'
        const params = [req.body.content,req.body.userId,req.body.postId]
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
