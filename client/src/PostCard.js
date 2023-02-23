import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid, IconButton, Stack } from '@mui/material';
import {ArrowUpward, ArrowDownward} from '@mui/icons-material'
import { Link } from '@mui/material';
import hoursAgo from './hoursAgo.js';
import {Box} from '@mui/material'
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import getScore from './getScore.js'

function handleUpvote(postId, jwt, setScore){
  if(!jwt){
    alert("You need to be logged in to vote!")
    return
  }
  const postUserId= jwt_decode(jwt).userId.toString()+postId.toString()
  fetch("http://localhost:3001/api/postVote",{
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+jwt
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({'postId':postId,"userId":jwt_decode(jwt).userId,'postUserId':postUserId, voteScore:"+1"})})
    .then((response)=>response.json())
    .then((data)=>{
          if(!data.error){
            getScore(postId).then((response)=>{
              setScore(response.data[0].voteScore);
            })
          }
          else{
            console.log(data.error);
          }
      })
  return
}

function handleDownvote(postId, jwt, setScore){

  if(!jwt){
    alert("You need to be logged in to vote!")
    return
  }
  const postUserId= jwt_decode(jwt).userId.toString()+postId.toString()
  fetch("http://localhost:3001/api/postVote",{
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+jwt
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({'postId':postId,"userId":jwt_decode(jwt).userId,'postUserId':postUserId, voteScore:"-1"})})
    .then((response)=>response.json())
    .then((data)=>{
          if(!data.error){
            getScore(postId).then((response)=>{
              setScore(response.data[0].voteScore);
            })
          }
          else{
            console.log(data.error);
          }
      })
  return
}


function PostCard (props){
  const [score,setScore] = useState(0)

  getScore(props.post.postId).then((response)=>{
    if(response.data[0].voteScore === null){
      setScore(0)
    }else{
      setScore(response.data[0].voteScore);
    }

  })
  if(props.commentLink === true){
    if(props.post.content.length > 300){
      props.post.content = props.post.content.substring(0,300)+"..."
    }
    return(
      <Card className='PostCard' sx={{mt: 4,mb: 2, bgcolor: 'primary.background', boxShadow: 3}}>
        <Grid container alignItems={'center'}>
          <Grid item xs={1} md={1}>
            <Stack direction="column" spacing={2}>
                <Box textAlign={'center'} onClick={()=>{handleUpvote(props.post.postId,props.jwt,setScore)}} >
                  <ArrowUpward/>
                </Box> 
                <Typography textAlign={'center'}>{score}</Typography> 
                <Box textAlign={'center'} onClick={()=>{handleDownvote(props.post.postId,props.jwt,setScore)}} >
                  <ArrowDownward/>
                </Box> 
            </Stack>
          </Grid>
          <Grid item xs={11} md={11}>
          <CardContent sx={{margin: 1, mt: 1}}>
                <Link href={"http://localhost:3000/post/"+props.post.postId} sx={{textDecoration: 'none'}}>
                  <Typography variant={'h1'} sx={{ fontSize: "1.2rem" ,textAlign: "left"}} color="text.primary">
                    {props.post.title}
                  </Typography>
                </Link>
                <Typography variant={'body1'} sx={{fontSize:"0.7rem", mt:5, mb: 5, textAlign: "left"}} color="text.primary">
                  {props.post.content}
                </Typography>
                <div display="flex" style={{maxWidth:"90%"}}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={6} md={10} key='1'>
                    <Typography sx={{fontSize: '0.6rem', textAlign: "right"}}  color="text.secondary">
                    Asked by {props.post.author} {hoursAgo(props.post.created_at)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2} key='2'>
                    <Link href={"http://localhost:3000/post/"+props.post.postId} sx={{textDecoration: 'none'}}>
                      <Button color='secondary' size="small" variant='outlined' sx={{fontSize:"0.6rem", justifyContent: "center"}}>Comments</Button>       
                    </Link>
                  </Grid>
                </Grid>
                </div>
              </CardContent>
          </Grid>
        </Grid>
      </Card>
  )
  }
  else{
    return(
    <Card className='PostCard' sx={{mt: 4,mb: 2, bgcolor: 'primary.background', boxShadow: 3}}>
    <CardContent sx={{margin: 1, mt: 1}}>
        <Typography variant={'h1'} sx={{ fontSize: "1.6rem" ,textAlign: "left"}} color="text.primary">
          {props.post.title}
        </Typography>
      <Typography variant={'body1'} sx={{ fontSize:"0.7rem", mt:5, mb: 5, textAlign: "left"}} color="text.primary">
        {props.post.content}
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={12} key='1'>
          <Typography sx={{mr:3, fontSize: "0.7rem", textAlign: "right"}}  color="text.secondary">
          Asked by {props.post.author} {hoursAgo(props.post.created_at)}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
    )  
}
  

} export default PostCard;
