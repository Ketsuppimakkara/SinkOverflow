//This file generates a  SQLite database. If the tables already exist, the commands won't get updated so make sure to delete "db.sqlite" file if you make any changes here.
//Some dummy data also gets added when generating the database.

const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite"




const db = new sqlite3.Database(DBSOURCE, (err) =>{
    if(err) {
        console.error(err.message)
        throw err
    }
    else{
        db.run("PRAGMA foreign_keys = ON"); //Enable foreign keys in the database

        //Setups 
        db.run('CREATE TABLE User (userId INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT  NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP, CONSTRAINT email_unique UNIQUE (email))',(err)=>{
            if(err){
                if(err.message === "SQLITE_ERROR: table User already exists"){
                    return
                }
                else{
                    console.log(err.message);
                }
            }

            else{
                //Table created, adding dummy data:
                const stmt = db.prepare('INSERT INTO User (username, email, password) VALUES (?,?,?)')         //Prepared statement protects against SQL Injection attacks
                stmt.run('SinkOverflow Official','admin@sinkoverflow.com','$2a$10$UeQytQy7Kv1BTg2eQw473.enze3J6hPeb0u/F5dUQ7UiolxzrVrTK');
                stmt.run('Tobias Rieper','47@ica.com','$2a$10$UeQytQy7Kv1BTg2eQw473.enze3J6hPeb0u/F5dUQ7UiolxzrVrTK');
                stmt.finalize()
                
                //Setup a post list
                db.run('CREATE TABLE Post (postId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL, userId INTEGER NOT NULL, voteScore INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, FOREIGN KEY(userId) REFERENCES User(userId) ON DELETE CASCADE)',(err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        //Table created, adding dummy data:
                        const stmt = db.prepare('INSERT INTO Post (title, content, userId, voteScore) VALUES (?,?,?,?)')         //Prepared statement protects against SQL Injection attacks
        
                        stmt.run('Welcome to SinkOverflow',"This is a place to ask and answer code questions. Consider registering as a user to experience the full richness of this product.","1","2");
                        stmt.run("I have some code here which I think has multiple security vulnerabilities. How many can you spot?","Here's the source code: \n<code>var printText = $('.text').data('text');\n\nvar contentArray = printText.split('/n');\n$.each(contentArray, function(index, newLine) {\n  $('.text').append('<span style='display:block;' id='+index+'></span>');\n  \n  var lineID = index;\n  var self = $(this);\n    setTimeout(function () {\n      $.each(self, function(index, chunk){\n          setTimeout(function () {\n            $('#'+lineID).append('<span>'+chunk+'</span>');\n            $('body, html').scrollTop($(document).height());\n          }, index*5);\n      });\n      \n    }, index*100);\n});\n</code>\nThanks for the help!",2,1);

                        
                        stmt.finalize()

                        db.run("CREATE TRIGGER LastUpdated AFTER UPDATE OF title, content ON Post FOR EACH ROW BEGIN UPDATE Post SET updated_at = CURRENT_TIMESTAMP WHERE postId = OLD.postId; END")

                        //Setup a comment list
                        db.run('CREATE TABLE Comment (commentId INTEGER PRIMARY KEY AUTOINCREMENT, postId INTEGER NOT NULL, content TEXT NOT NULL, userId INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(postId) REFERENCES Post(PostId) ON DELETE CASCADE, FOREIGN KEY(userId) REFERENCES User(userId) ON DELETE CASCADE)',(err)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                //Table created, adding dummy data:
                                const stmt = db.prepare('INSERT INTO Comment (postId, content, userId) VALUES (?,?,?)')         //Prepared statement protects against SQL Injection attacks
                                stmt.run('2'," I'm a security expert working on keycard readers at Kronstadt, by the way so you know you can trust me. I'll make sure any problems you can spot get the attention they deserve.","2");

                                stmt.finalize()

                                db.run('CREATE TABLE PostVote (postVoteId INTEGER PRIMARY KEY, postId INTEGER NOT NULL, userId INTEGER NOT NULL, postUserId TEXT GENERATED ALWAYS AS (CAST(postId as text)||CAST(userId as text)) UNIQUE, voteScore INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(postId) REFERENCES Post(PostId) ON DELETE CASCADE, FOREIGN KEY(userId) REFERENCES User(userId) ON DELETE CASCADE CHECK (-2<voteScore AND voteScore< 2))',(err)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        //Table created, adding dummy data:
                                        const stmt = db.prepare('INSERT INTO postVote (postId, userId, voteScore) VALUES (?,?,?)')         //Prepared statement protects against SQL Injection attacks
                                        stmt.run('1',"2","1");
                                        stmt.run('1',"1","1");
                                        stmt.run('2',"2","1");
        
                                        stmt.finalize()
                                    }
                                })
                            }
                        })

                        


                    console.log("Database initialized with dummy data!");
                    }
                })
            }
        })
    }
});

module.exports = db