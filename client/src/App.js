import './App.css';
import './Posts.js';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar.js';


import { ThemeProvider, createTheme} from '@mui/material/styles';
import Posts from './Posts.js';
import Post from './Post.js';
import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';
import Comments from './Comments.js'
import AddPost from './AddPost';
import AddComment from './AddComment';


function App() {

  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [user, setUser] = useState({});

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

  const [data, setData] = useState(null);

  useEffect(()=>{
    async function getPosts(){
      fetch("http://localhost:3001/api/posts")
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

        </Routes>
        </ThemeProvider>;
      </div>
    </Router>
  )
}

export default App;
