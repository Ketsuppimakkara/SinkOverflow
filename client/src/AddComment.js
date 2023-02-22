import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import {useParams} from 'react-router-dom'

function AddComment(props) {
  console.log(props.postId)
  let {id} = useParams()
  
  const [content, setContent] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  if(props.jwt.jwt === null){                //User is not allowed to go to create post page if they are logged in already. window.history.back just boots them back to where they came from
    return(<Box justifyContent={'center'}> <Button color='secondary' variant='outlined' size="large" style={{marginLeft: 'auto'}} onClick={()=>{alert("You must be logged in to post comments!")}}>Add comment</Button> </Box>)
  }
  else{
  return(
    <div className='AddComment'>
      <Card className='NewCommentCard' sx={{bgcolor: 'primary.background'}}>
        <CardContent sx={{ml:6, mr:6}}>
          <Typography sx={{ fontSize: "1.0rem" }} color="text.secondary" gutterBottom>
            Reply with a comment
          </Typography>
            <TextField id="Content" fullWidth color="secondary" sx={{textarea:{resize:"vertical"}, backgroundColor:"#450101"}} variant="outlined" type={'text'} multiline onChange={(evt) => {setContent(evt.target.value)}}/>
        </CardContent>
        <CardActions style={{display:"flex"}}>
          <Grid container>
            <Grid item xs={6} md={8}>
              <Box textAlign={'center'}>
                <Typography id="Error" sx={{fontSize: "0.5rem"}}> {errorMsg} </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box textAlign="center">
              <Button color='primary' variant='contained' size="medium" sx={{fontSize: "0.5rem"}} onClick={()=>{

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
              </Box>
            </Grid>
          </Grid>


        </CardActions>
      </Card>
    </div>
  )
}
}

export default AddComment;