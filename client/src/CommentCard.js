import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import hoursAgo from './hoursAgo.js';



function CommentCard (props){
  return(
    <Card className='PostCard' sx={{mt: 1,mb: 1, bgcolor: 'primary.background', boxShadow: 3}}>
    <CardContent sx={{margin: 1, mt: 1}}>
      <Typography variant={'body1'} sx={{ mt:5, mb: 5, textAlign: "left"}} color="text.primary">
        {props.comment.content}
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={12} key='1'>
          <Typography sx={{mr:1, fontSize: "0.7rem", textAlign: "right"}}  color="text.secondary">
          Posted by {props.comment.author} {hoursAgo(props.comment.created_at)}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
    )  
} export default CommentCard;
