import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import hoursAgo from './hoursAgo.js';
import Truncate from 'react-truncate';




function PostCard (props){

  if(props.commentLink === true){
    console.log(props.post.content)
    if(props.post.content.length > 300){
      props.post.content = props.post.content.substring(0,300)+"..."
    }
    return(
      <Card className='PostCard' sx={{mt: 4,mb: 2, bgcolor: 'primary.background', boxShadow: 3}}>
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
