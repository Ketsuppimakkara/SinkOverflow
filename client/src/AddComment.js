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

function AddComment(props) {
  
  const [content, setContent] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  if(props.jwt.jwt === null){                //User is not allowed to go to create post page if they are logged in already. window.history.back just boots them back to where they came from
    return(          <Button color='secondary' variant='outlined' size="large" style={{marginLeft: 'auto'}} onClick={()=>{alert("You must be logged in to post comments!")}}>Add comment</Button>)
  }
  else{
  return(
    <div style={{}}>
      <Card className='PostCard' sx={{bgcolor: 'primary.background'}}>
        <CardContent sx={{ml:6, mr:6}}>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Reply with a comment
          </Typography>
            <TextField style={{display:"flex"}} id="Content" variant="outlined" type={'text'} multiline color='secondary' sx={{fieldset:{background:'#450101'},textarea:{resize:"both"}, }} onChange={(evt) => {setContent(evt.target.value)}}/>
        </CardContent>
        <CardActions style={{display:"flex"}}>
          <Typography id="Error" style={{marginLeft: 'auto'}}> {errorMsg} </Typography>
          <Button color='secondary' variant='outlined' size="large" style={{marginLeft: 'auto'}} onClick={()=>{

            fetch("http://localhost:3001/api/comments",{
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+props.jwt.jwt
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify({'postId':props.postId,'content':content,"userId":jwt_decode(props.jwt.jwt).userId})})
              .then((response)=>response.json())
              .then((data)=>{
                    if(!data.error){
                      setErrorMsg("COMMENT ADDED!")
                      setTimeout(()=>{
                        window.location.reload()},1000);
                    }
                    else{
                      setErrorMsg("Title or content cannot be empty".toUpperCase())
                    }
                })
            }
          }>Add comment</Button>
        </CardActions>
      </Card>
    </div>
  )
}
}

export default AddComment;