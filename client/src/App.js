import './App.css';
import './Posts.js';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar.js';
import hljs from "highlight.js";

import "highlight.js/styles/github.css";


import { ThemeProvider, createTheme} from '@mui/material/styles';
import {Button} from '@mui/material'
import Posts from './Posts.js';
import Post from './Post.js';
import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';
import Comments from './Comments.js'
import AddPost from './AddPost';
import AddComment from './AddComment';
import EditPost from './EditPost.js'
import Profile from './Profile';

// On the lowest level we handle JWT authentication, localStorage, the basic color theme and routing.
// This could use refactoring to use the user state instead of passing jwt around.

//TODO: Add a refresh to jwt on interactions, currently jwt expires in 20 minutes regardless of what you do on the site, bar logging out.
function App() {


  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [user, setUser] = useState({});


  //These set the visual look of buttons based on whether user is logged in. The buttons are less conspicuous when not logged in.
  let addPostButtonMode = "outlined"
  let addPostButtonColor = "secondary"

  if(jwt !== null){
    addPostButtonMode = "contained"
    addPostButtonColor = "primary"
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#d50000',
        background: '#7f0000',
        text: "#FFFFFF"
      },
      button: {
        main: '#a00000',
        background: '#7f0000',
        text: "#FFFFFF"
      },
      secondary: {
        main: '#FFFFFF',
        background: '#111215' 
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#FFFFFF'
      }
    },
  });
  
  //Thiss data state has the posts on the front page.
  const [data, setData] = useState(null);


  //Primary useEffet for posts. Fetches all posts from api, then sets the data for use in a Posts component
  //This gets updated once per render
  useEffect(()=>{
    async function getPosts(){
      fetch("/api/posts")
      .then((response) => response.json())
      .then(data);
      if(mounted === true){
        setData(data)
      }
  }
  let mounted = true;
  getPosts();
  return()=>{
    mounted = false
  }
},[])

//Router paths and their rendered components below. 
  return (
    
    <Router>
      <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
        <Route path='/' element={<>
            <div>
              <ResponsiveAppBar jwt = {jwt}  setJwt = {setJwt}/>
            </div>
            <header className="App-header">
                <Posts jwt = {jwt} postArray={!data ? {data:[{postId: 1, title:"Loading...",content:"Loading...",author:"Loading..."},{postId: 2, title:"Loading...",content:"Loading...",author:"Loading..."}]}: data}/>
                <Button href='/post/new.html' color={addPostButtonColor} variant={addPostButtonMode} sx={{ my: 2, fontSize:"0.7rem"}}>Add a Post</Button> 
            </header>
        </>}/>

        <Route path='/login.html' element={<>
            <div>
              <ResponsiveAppBar jwt = {jwt}  setJwt = {setJwt}/>
            </div>
            <header className="App-header">
                <LoginCard jwt = {jwt} setJwt = {setJwt} setUser = {setUser}/>
            </header>
        </>}/>

        <Route path='/register.html' element={<>
            <div>
              <ResponsiveAppBar jwt = {jwt} setJwt = {setJwt}/>
            </div>
            <header className="App-header">
                <RegisterCard jwt = {jwt}/>
            </header>
        </>}/>
        
        <Route path='/post/:id' element={<>
            <div>
              <ResponsiveAppBar jwt = {jwt} setJwt = {setJwt}/>
            </div>
            <header className="App-header">
                <Post jwt = {jwt}/>
                <Comments jwt = {jwt}/>
            </header>
        </>}/>


        <Route path='/post/new.html' element={<>
            <div>
              <ResponsiveAppBar jwt = {jwt} setJwt = {setJwt}/>
            </div>
            <header className="App-header">
                <AddPost jwt = {jwt}/>
            </header>
        </>}/>

        <Route path='/post/:id/edit.html' element={<>
            <div>
              <ResponsiveAppBar jwt = {jwt} setJwt = {setJwt}/>
            </div>
            <header className="App-header">
                <EditPost jwt = {jwt}/>
            </header>
        </>}/>

        
        <Route path='/profile/:id' element={<>
            <div>
              <ResponsiveAppBar jwt = {jwt} setJwt = {setJwt}/>
            </div>
            <header className="App-header">
                <Profile jwt = {jwt}/>
            </header>
        </>}/>

        </Routes>
        </ThemeProvider>;
      </div>
    </Router>
  )
}

export default App;
