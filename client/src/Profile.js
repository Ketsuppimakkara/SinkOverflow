import * as React from 'react';
import PostCard from './PostCard.js';
import {useState, useEffect, useRef} from 'react';
import './BasicPagination.js';
import {useParams} from 'react-router-dom';
import AddComment from './AddComment.js';
import jwt_decode from 'jwt-decode';
import {Grid, Button, Stack, Card, CardContent, Avatar, Box, Typography} from '@mui/material'
import Posts from './Posts.js';
import Comments from './Comments.js';



function Profile({jwt}) {

  let {id} = useParams()
  const [data, setData] = useState();
  const [profileData, setProfileData] = useState({"name":"loading","registerDate":"loading"})
  const [postData, setPostData] = useState(<Posts jwt = {jwt} userId={id} postsPerPage={5} postArray={!data ? {data:[{postId: 1, title:"Loading...",content:"Loading...",author:"Loading..."},{postId: 2, title:"Loading...",content:"Loading...",author:"Loading..."}]}: data}/>);
  const [setting, setSetting] = useState("comments");
  const didMount = useRef(false)




  useEffect(()=> async function getPosts(){
    if ( !didMount.current ) {                  //This ignores the useEffect on first render
      return didMount.current = true;
    }

    if(setting === "posts"){
        setPostData(<Posts jwt = {jwt} userId={id} postsPerPage={5} postArray={!data ? {data:[{postId: 1, title:"Loading...",content:"Loading...",author:"Loading..."},{postId: 2, title:"Loading...",content:"Loading...",author:"Loading..."}]}: data}/>)                       
    }
    else if (setting === "comments"){
      setPostData(<Comments jwt={jwt} userId={id}/>)
    }
  },[setting])    //If setting hasn't changed, don't do the fetch even if the page re-renders
   
  useEffect(()=> async function getProfileData(){
    console.log("what")
    if(profileData.name === "loading"){
      fetch("/api/users?userId="+id)
      .then((response)=>response.json())
      .then(data=>{
        const registerDate = data.data.created_at.split(" ")[0].split("-")                  //First split the time, then split dates. They get reconstructed in the next row
        setProfileData({"name":data.data.username,"registerDate":registerDate[2]+"."+registerDate[1]+"."+registerDate[0]})       
      })
              
    }
  },[])    //If setting hasn't changed, don't do the fetch even if the page re-renders


  let profileComponent = 
  <>
    <Card className='ProfileCard' sx={{display: { xs: 'none', md: 'flex' }, mt: 4,mb: 2, bgcolor: 'primary.background', boxShadow: 3}}>
        <Grid container>
            <Grid item xs={6} md={4}>
              <Stack sx={{mx:4, mb:4}} spacing={2}>
                <div>
                <Typography variant='h1' sx={{fontSize:"1.8rem",mt:2}}>{profileData.name}</Typography>
                  <Avatar alt="Longnose dog" src="/public/images/borzoi.jpg" sx={{width:86,height:86,m:2}}/>
                  <Typography sx={{fontSize:"0.8rem"}}>Member since {profileData.registerDate}</Typography>
                </div>
                <div>
                  <Stack spacing={2}>
                    <Button variant='contained' onClick={()=>{
                      setSetting("comments")
                    }}>
                      Posts
                    </Button >
                    <Button variant='contained'  onClick={()=>{
                      setSetting("posts")
                      }}>
                      Comments
                    </Button>
                  </Stack>
                </div>

              </Stack>
            </Grid>
            <Grid item xs={6} md={8}>
              <CardContent sx={{margin: 4}}>
                {postData}
              </CardContent>
            </Grid>
        </Grid>
  </Card>

<Card className='ProfileCard' sx={{display: { xs: 'flex', md: 'none' }, mt: 4,mb: 0, bgcolor: 'primary.background', boxShadow: 3}}>
              <Stack sx={{mx:1, mb:1}} spacing={2}>
                <div display="flex">
                  <Typography variant='h1' sx={{fontSize:"1rem",mt:1}}>{profileData.name}</Typography>
                  <Avatar alt="Longnose dog" src="/public/images/borzoi.jpg" sx={{width:66,height:66,m:2}}/>
                  <Typography sx={{fontSize:"0.6rem"}}>Member since {profileData.registerDate}</Typography>
                </div>
                <div>
                  <Stack spacing={2}>
                    <Button sx={{ width: "76vw"}} size={"small"} variant='contained' onClick={()=>{setSetting("comments")}}>
                      Posts
                    </Button >
                    <Button sx={{ width: "76vw"}} size={"small"} variant='contained'  onClick={()=>{setSetting("posts")}}>
                      Comments
                    </Button>
                  </Stack>
                </div>
                <div>         
                <CardContent sx={{width: "78vw",margin: 1}}>
                  {postData}
                </CardContent>
                </div>  
              </Stack>
  </Card>
</>
return(<div>{profileComponent}</div>);
}
export default Profile;