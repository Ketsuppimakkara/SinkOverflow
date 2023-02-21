const { json } = require('express');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var db = require('../../database.js');
const {body, validationResult} = require('express-validator');


//Post route for registering
router.post('/', body('email').isEmail(),body('password').isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}),(req, res, next) => {

  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    console.log(validationErrors)
    return res.status(400).json({error:"Invalid "+validationErrors.errors[0].param})
  }
  else{
    res.header('Access-Control-Allow-Origin',"http://localhost:3000")       //Set header to allow react to access cross-origin resources
    const query = 'SELECT email,username FROM "User" WHERE email = ? OR username = ?'
    const params = [req.body.email,req.body.username]
    db.get(query,params,(err,row)=>{
      if(err){
        res.status(400).json({error:err.message})
      }
      else{
        if(!row){
          const salt = bcrypt.genSaltSync(10);
          const encryptedPassword = bcrypt.hashSync(req.body.password,salt)

          const query = 'INSERT INTO "User" (username,email,password) VALUES (?,?,?)'
          const params = [req.body.username,req.body.email,encryptedPassword]
          db.run(query,params,(err)=>{
            if(err){
              res.status(400).json({error:err.message});
            }
            else{
              res.status(200).json({message:"success"});
            }
          })
        }
        else{
          if(row.email == req.body.email){
            res.status(400).json({error:"Email already in use!"})
          }
          else if(row.username == req.body.username){
            res.status(400).json({error:"Username already in use!"})
          }
        }
      }
    })
  }

});


module.exports = router;
