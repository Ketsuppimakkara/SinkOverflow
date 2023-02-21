import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import hoursAgo from './hoursAgo.js';



function PostCard (props){
  if(props.commentLink === true){
    return(
      <Card className='PostCard' sx={{mt: 4,mb: 2, bgcolor: 'primary.background', boxShadow: 3}}>
              <CardContent sx={{margin: 1, mt: 1}}>
                <Link href={"http://localhost:3000/post/"+props.post.postId} sx={{textDecoration: 'none'}}>
                  <Typography variant={'h1'} sx={{ fontSize: 32 ,textAlign: "left"}} color="text.primary">
                    {props.post.title}
                  </Typography>
                </Link>
                <Typography variant={'body1'} sx={{ mt:5, mb: 5, textAlign: "left"}} color="text.primary">
                  {props.post.content}
                </Typography>
                <Grid container alignItems="center">
                  <Grid item xs={10} key='1'>
                    <Typography sx={{mr:4, fontSize: 14, textAlign: "right"}}  color="text.secondary">
                    Asked by {props.post.author} {hoursAgo(props.post.created_at)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} key='2'>
                    <Link href={"http://localhost:3000/post/"+props.post.postId} sx={{textDecoration: 'none'}}>
                      <Button color='secondary' size="small" variant='outlined' style={{marginLeft: 'auto'}}>Comments</Button>       
                    </Link>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
  )
  }
  else{
    return(
    <Card className='PostCard' sx={{mt: 4,mb: 2, bgcolor: 'primary.background', boxShadow: 3}}>
    <CardContent sx={{margin: 1, mt: 1}}>
        <Typography variant={'h1'} sx={{ fontSize: 32 ,textAlign: "left"}} color="text.primary">
          {props.post.title}
        </Typography>
      <Typography variant={'body1'} sx={{ mt:5, mb: 5, textAlign: "left"}} color="text.primary">
        {props.post.content}
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={12} key='1'>
          <Typography sx={{mr:3, fontSize: 14, textAlign: "right"}}  color="text.secondary">
          Asked by {props.post.author} {hoursAgo(props.post.created_at)}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
    )  
}
  

} export default PostCard;
