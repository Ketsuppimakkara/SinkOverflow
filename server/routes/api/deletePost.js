const { json } = require('express');
var express = require('express');
var router = express.Router();
var validateJWTToken = require('../../validateJWTToken')
var db = require('../../database.js');


/*Post route for adding new post
Body must include title, content and userId
*/
router.post('/:id', validateJWTToken,function(req, res, next) {

  res.header('Access-Control-Allow-Origin',"*")       //Set header to allow react to access cross-origin resources
        const query = 'DELETE FROM post WHERE postId = (?) AND userId = (?)'      //The userId gets taken from JWT, if it doesn't match the about to be deleted posts' author, the delete query won't match anything
        const params = [req.params.id,req.body.userId]
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
