import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import jwt_decode from 'jwt-decode';


function EditPost({jwt}) {

  let {id} = useParams()
    
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let previousTitle = ""
  let previousContent = ""
  const navigate = useNavigate();

  useEffect(()=>{
    async function getPost(){
      fetch("/api/posts?postId="+id)
      .then((response) => response.json())
      .then(postData =>{
        const post = postData.data[0]

        if(post.userId !== jwt_decode(jwt).userId){
          alert("You can only edit your own posts!")      //User is not allowed to go to edit a post they didn't make. You can't get here through the UI but you can just replace the post ID when you're on the edit page. This boots you back 
          window.history.back()
          return
        }
        else{
          if(mounted === true){
            previousTitle = post.title
            previousContent = post.content
            document.getElementById("Title").value = post.title
            document.getElementById("Content").value = post.content
            setTitle(post.title)
            setContent(post.content)
          }
        }
      })
  }

  let mounted = true;
  getPost();
  return()=>{
    mounted = false
  }
},[])
  return(
    <div>
      <Card className='NewPostCard' sx={{ bgcolor: 'primary.background'}}>
        <CardContent sx={{mx:{xs: 1,md:6}}}>
          <Typography sx={{fontSize:{xs: "0.8rem", md: "1.2rem"}}} color="text.secondary" gutterBottom>
            Edit post
          </Typography>
          <Stack spacing={2}>
            <TextField id="Title"  inputProps={{style:{fontSize:"0.8rem"}}} variant="outlined" type={'text'} color='secondary' sx={{input:{background:'#450101'}}} onChange={(evt) => {setTitle(evt.target.value)}}/>
            <TextField id="Content"  color="secondary" inputProps={{style:{height:"250px", fontSize:"0.8rem"}}} sx={[{textarea:{resize:"vertical"}, backgroundColor:"#450101"}]} variant="outlined" type={'text'} multiline onChange={(evt) => {setContent(evt.target.value)}}/>
          </Stack>
        </CardContent>
        <CardActions style={{display:"flex"}}>
          <Typography id="Error" style={{marginLeft: 'auto'}}> {errorMsg} </Typography>
          <Button sx={[{size:{xs: "small",md:"large"}},{fontSize: {xs: "0.6rem", md: "1rem"}},{m:{xs:1,md:2}}]} color='primary' variant='contained' onClick={()=>{

            fetch("/api/posts?postId="+id,{
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
              body: JSON.stringify({'title':title,'content':content,"userId":jwt_decode(jwt).userId,"postId":id})})
              .then((response)=>response.json())
              .then((data)=>{
                    if(!data.error){
                      setErrorMsg("POST EDITED SUCCESSFULLY!")
                      setTimeout(()=>{
                        window.location = "/"},750);
                    }
                    else{
                      setErrorMsg("Title or content cannot be empty".toUpperCase())
                    }
                })
            }
          }>Publish edit</Button>
          <Button sx={[{size:{xs: "small",md:"large"}},{fontSize: {xs: "0.6rem", md: "1rem"}},{m:{xs:1,md:2}}]} color='secondary' variant='outlined' onClick={()=>{

          fetch("/api/posts/delete/"+id,{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+jwt
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'})
            .then((response)=>response.json())
            .then((data)=>{
                  if(!data.error){
                    setErrorMsg("POST DELETED!")
                    setTimeout(()=>{
                      window.location = "/"},750);
                  }
              })
          }}>DELETE POST</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default EditPost;