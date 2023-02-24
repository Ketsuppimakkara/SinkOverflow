const { json } = require('express');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require ('jsonwebtoken')
var db = require('../../database.js');

/*Post route for handling login. 
Body must include email and password.

Password gets compared to encrypted value in database.
Email and username must match.
Returns a JWT token on succesful login for authorization.
*/
router.post('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin',"http://localhost:3000")       //Set header to allow react to access cross-origin resources
  const query = 'SELECT email,password,username,userId FROM "User" WHERE email = ?'      //Parametrized query to protect from SQL injections
  const params = [req.body.email]
  db.get(query,params,(err,row)=>{
    if(err){
      res.status(400).json({error:err.message})
      return
    }
    else{
      if(!row){
        res.status(400).json({error:"invalid credentials"});   //If no user with matching name is found in the database, we send an identical message we would send if the user was found for security purposes
        return
      }
      else{
        if(row.email == req.body.email){                                          //Check that given email matches one in database
          bcrypt.compare(req.body.password, row.password, (err,isMatch) =>{       //Compare given password with encrypted password in database
            if(err){                                                              //Bcrypt error handler
              res.status(400).json({error:err.message});                
              return
            }
            if(!isMatch){                                                         //Give invalid credentials error if passwords don't match
              res.status(400).json({error:"Invalid credentials"});
              return
            }
            else{                                                                 //Generate JWT token for login
                const jwtPayload = {
                  userId: row.userId,
                  username: row.username,
                  email: row.email
                };
                jwt.sign(
                  jwtPayload,
                  process.env.SECRET,{
                    expiresIn: 1200
                  },
                  (err,token)=>{
                    if(err){                                                      //Token generation error handling
                      res.status(400).json({error:err.message});
                      return
                    }
                    else{
                      res.json({message:"Logged in successfully",token:token})    //Send token on successful login
                      return
                    }
                  }
                )
            }
          })
        }
        else{                                                                       //Send invalid credentials on mismatching email
          res.status(400).json({message:"invalid credentials"});
        }
      }
    }
  })
});


module.exports = router;
