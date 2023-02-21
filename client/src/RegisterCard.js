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


function RegisterCard({setJwt, jwt}) {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();


  if(jwt!== null){                //User is not allowed to go to register page if they are logged in already. window.history.back just boots them back to where they came from
    window.history.back()
  }
  else{
  return(
    <div style={{width:450,}}>
      <Card className='LoginCard' sx={{ minWidth: 275, bgcolor: 'primary.background'}}>
        <CardContent sx={{ml:6, mr:6}}>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Register
          </Typography>
          <Stack spacing={2}>
            <TextField id="username" label="Username" variant="outlined" type={'text'} color='secondary' sx={{input:{background:'#450101'}}} onChange={(evt) => {setUsername(evt.target.value)}}/>
            <TextField id="email" label="Email" variant="outlined" type={'email'} color='secondary' sx={{input:{background:'#450101'}}} onChange={(evt) => {setEmail(evt.target.value)}}/>
            <TextField id="password" label="Password" variant="outlined" type={'password'} color='secondary' sx={{input:{background:'#450101'}}} helperText="*At least 8 upper- and lowercase characters, including one number and one symbol required" onChange={(evt) => {setPassword(evt.target.value)}}/>
          </Stack>
        </CardContent>
        <CardActions style={{display:"flex"}}>
          <Typography id="Error" style={{marginLeft: 'auto'}}> {errorMsg} </Typography>
          <Button color='secondary' variant='outlined' size="large" style={{marginLeft: 'auto'}} onClick={()=>{

            fetch("http://localhost:3001/api/register",{
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers:{
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify({'username':username,'email':email,"password":password})})
              .then((response)=>response.json())
              .then((data)=>{
                    if(!data.error){
                      setErrorMsg("REGISTRATION SUCCESSFUL")
                      setTimeout(()=>{
                        window.location.replace("/login.html")},1500);
                    }
                    else{
                      setErrorMsg(data.error.toUpperCase())
                    }
                })
            }
          }>Register</Button>
        </CardActions>
      </Card>
    </div>
  )
}
}

export default RegisterCard;