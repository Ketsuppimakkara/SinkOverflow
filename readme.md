SinkOverflow

This is a full-stack web app for sharing code snippets.
It functions like an old-school message board.

Features:
Backend:    Backend implemented with Node.js using Express framework.
            An SQLite database containing all persistent information
            API to access and modify the information in the database
            Use of parametrized queries to protect against SQL injections
            Encryption of passwords in database using bcrypt
            Use of SQL constraints to keep voting data valid after successive votes by same user
            
Frontend:   Frontend implemented with React and Material UI
            Reactive UI usable with mobile devices
            Ability to login, logout and register as a user
            Password requirements (8 characters, one upper- and one lowercase character, one number and a symbol required)
            JWT-based authentication
            Authenticated users can create posts, comment on posts and vote on them 
            Ability to edit your own posts
            Pagination can be used when over 10 posts are in the database
            Code highlighting syntax for posts and comments
            Timestamp of post creation visible
            
          
Usage:
Make sure you have React and NPM installed
To run development server, use command "npm run dev"
You can also run the backend and frontend separately in different 
terminals with commands "npm run server" and "npm run client"

Code highlighting can be done in posts and comments by using <code> </code> tags. 

Example: 
                My code looks like this:
                <code>function foo (bar){
                  return(bar)
                }</code>
                What do you guys think?

Result:

![image](https://user-images.githubusercontent.com/77271158/221673389-decb9e6d-a1a3-4692-84ae-8a046d4fe279.png)


Tested with: 
  Node.js version 19.6.0
  React version 18.2.0
  
