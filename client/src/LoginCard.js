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


//This function renders the login card. If you're already logged in, you shouldn't be here, so you get redirected.
//On successful login, you get a Json Web Token, which gets stored in your localstorage for persistence. JWT expires after 20 minutes. 
function LoginCard({setJwt, setUser, jwt}) {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  const navigate = useNavigate();

  if(jwt!== null){                //User is not allowed to go to login page if they are logged in already.
    window.history.back()
  }

  else{
  return(
    <div style={{width:650, maxWidth:"80%"}}>
      <Card className='LoginCard' sx={{mt:4, minWidth: 275, bgcolor: 'primary.background'}}>
        <CardContent sx={{mx:{xs:1,md:6}}}>
          <Typography sx={{ fontSize: {xs:"1rem", md:"1.4rem"} }} color="text.secondary" gutterBottom>
            Login
          </Typography>
          <Stack spacing={2}>
            <TextField id="email" label="Email" variant="outlined" type={'email'} color='secondary' sx={{input:{background:'#450101'}}} onChange={(evt) => {setEmail(evt.target.value)}}/>
            <TextField id="password" label="Password" variant="outlined" type={'password'} color='secondary' sx={{input:{background:'#450101'}}} onChange={(evt) => {setPassword(evt.target.value)}}/>
          </Stack>
        </CardContent>
        <CardActions style={{display:"flex"}}>
          <Typography id="Error" sx={{ fontSize: {xs:"0.6rem", md:"1rem"} }} style={{marginLeft: 'auto'}}> {errorMsg} </Typography>
          <Button sx={{size:{xs:"small",md:"large"},fontSize:{xs:"0.6rem",md:"0.8rem"}}} color='secondary' variant='outlined' size="large" style={{marginLeft: 'auto'}} onClick={()=>{

            fetch("/api/login",{
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers:{
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify({'email':email.toString(),"password":password.toString()})})
              .then((response)=>response.json())
              .then((data)=>{
                    if(!data.token){
                      setErrorMsg(data.error.toUpperCase())
                    }
                    else{
                      setJwt(data.token)
                      localStorage.setItem('jwt',data.token)          //insecure, can be accessed via XSS
                      navigate("/")
                    }})
            }
          }>Login</Button>
        </CardActions>
      </Card>
    </div>
  )
}} export default LoginCard;