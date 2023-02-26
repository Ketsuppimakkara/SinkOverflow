import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';

function AddPost(jwt) {
    
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  if(jwt.jwt === null){                //User is not allowed to go to create post page if they are logged in already. window.history.back just boots them back to where they came from
    alert("You must be logged in to create posts!")
    window.history.back()
  }
  else{
  return(
    <div>
      <Card className='NewPostCard' sx={{ bgcolor: 'primary.background'}}>
        <CardContent sx={{ml:6, mr:6}}>
          <Typography sx={{ fontSize: "1.2rem" }} color="text.secondary" gutterBottom>
            Add a new post
          </Typography>
          <Stack spacing={2}>
            <TextField id="Title" label="Title" variant="outlined" type={'text'} color='secondary' sx={{input:{background:'#450101'}}} onChange={(evt) => {setTitle(evt.target.value)}}/>
            <TextField id="Content" color="secondary" sx={{textarea:{resize:"both"}, backgroundColor:"#450101"}} variant="outlined" type={'text'} multiline onChange={(evt) => {setContent(evt.target.value)}}/>
          </Stack>
        </CardContent>
        <CardActions style={{display:"flex"}}>
          <Typography id="Error" style={{marginLeft: 'auto'}}> {errorMsg} </Typography>
          <Button color='secondary' variant='outlined' size="large" style={{marginLeft: 'auto'}} onClick={()=>{

            fetch("/api/posts",{
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+jwt.jwt
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify({'title':title,'content':content,"userId":jwt_decode(jwt.jwt).userId})})
              .then((response)=>response.json())
              .then((data)=>{
                    if(!data.error){
                      setErrorMsg("POST CREATED SUCCESSFULLY!")
                      setTimeout(()=>{
                        window.history.back()},1000);
                    }
                    else{
                      setErrorMsg("Title or content cannot be empty".toUpperCase())
                    }
                })
            }
          }>CREATE POST</Button>
        </CardActions>
      </Card>
    </div>
  )
}
}

export default AddPost;