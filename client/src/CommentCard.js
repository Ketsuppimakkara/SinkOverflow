import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import hoursAgo from './hoursAgo.js';
import FormattedText from './FormattedText.js'



function CommentCard (props){
  return(
    <Card className='PostCard' sx={{mt: 1,mb: 1, bgcolor: 'primary.background', boxShadow: 3}}>
    <CardContent sx={{margin: 1}}>
      <Typography variant={'string'} sx={{ my:{xs:1,md:2}, fontSize:{xs:"0.5rem",md:"0.6rem"}, textAlign: "left"}} color="text.primary">
        <FormattedText text = {props.comment.content}></FormattedText>
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={12} key='1'>
          <Typography sx={{m:1, fontSize: {xs: '0.5rem', md:'0.6rem'}, textAlign: "right"}}  color="text.secondary">
          Posted by {props.comment.author} {hoursAgo(props.comment.created_at)}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
    )  
} export default CommentCard;
