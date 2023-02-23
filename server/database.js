const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const DBSOURCE = "db.sqlite"

const db = new sqlite3.Database(DBSOURCE, (err) =>{
    if(err) {
        console.error(err.message)
        throw err
    }
    else{
        db.run("PRAGMA foreign_keys = ON"); //Enable foreign keys in the database

        //Setups 
        db.run('CREATE TABLE User (userId INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT  NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, CONSTRAINT email_unique UNIQUE (email))',(err)=>{
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
                stmt.run('Admin','admin@sinkoverflow.com','password1234');
                stmt.run('Lassi','poweruser@email.com','KOd1@k17');
                stmt.finalize()
                
                //Setup a post list
                db.run('CREATE TABLE Post (postId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL, userId INTEGER NOT NULL, postScore INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(userId) REFERENCES User(userId))',(err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        //Table created, adding dummy data:
                        const stmt = db.prepare('INSERT INTO Post (title, content, userId) VALUES (?,?,?)')         //Prepared statement protects against SQL Injection attacks
        
                        stmt.run('How do i create a <blink> tag?',"I found this cool tag but it doesn't work. What's up with that?","2");
                        stmt.run('Ask your code questions here',"Somebody will surely help you :)","1");
                        
                        stmt.finalize()



                        //Setup a comment list
                        db.run('CREATE TABLE Comment (commentId INTEGER PRIMARY KEY AUTOINCREMENT, postId INTEGER NOT NULL, content TEXT NOT NULL, userId INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(postId) REFERENCES Post(PostId), FOREIGN KEY(userId) REFERENCES User(userId))',(err)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                //Table created, adding dummy data:
                                const stmt = db.prepare('INSERT INTO Comment (postId, content, userId) VALUES (?,?,?)')         //Prepared statement protects against SQL Injection attacks
                                stmt.run('1',"You should look into https://www.spacejam.com/1996/, see if you get some inspiration","1");
                                stmt.run('1',"Thanks, this looks great!","2");

                                stmt.finalize()

                                db.run('CREATE TABLE PostVote (postVoteId INTEGER PRIMARY KEY, postId INTEGER NOT NULL, userId INTEGER NOT NULL, postUserId TEXT NOT NULL UNIQUE, voteScore INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(postId) REFERENCES Post(PostId), FOREIGN KEY(userId) REFERENCES User(userId) CHECK (-2<voteScore AND voteScore< 2))',(err)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        //Table created, adding dummy data:
                                        const stmt = db.prepare('INSERT INTO postVote (postId, userId, postUserId, voteScore) VALUES (?,?,?,?)')         //Prepared statement protects against SQL Injection attacks
                                        stmt.run('1',"2","12","1");
                                        stmt.run('1',"1","11","-1");
                                        stmt.run('2',"1","21","1");
                                        stmt.run('2',"2","22","1");
        
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