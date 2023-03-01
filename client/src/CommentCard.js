import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import hoursAgo from './hoursAgo.js';
import FormattedText from './FormattedText.js'
import { Link } from 'react-router-dom';



function CommentCard (props){
  console.log(props)
  let content = <FormattedText text = {props.comment.content}></FormattedText>

  if(props.withLink === true){
    content= <Link to ={"../../post/"+props.comment.postId}> <FormattedText text = {props.comment.content}></FormattedText> </Link>
  }

  return(
    <Card className='PostCard' sx={{mt: 1,mb: 1, bgcolor: 'primary.background', boxShadow: 3}}>
    <CardContent sx={{margin: 1}}>
      <Typography variant={'string'} sx={{ my:{xs:1,md:2}, fontSize:{xs:"0.5rem",md:"0.6rem"}, textAlign: "left"}} color="text.primary">
        {content}
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={12} key='1'>
          <Typography sx={{fontSize: {xs: '0.5rem', md:'0.6rem'}, textAlign: "right"}}  color="text.secondary">
          Asked by {<a sx={{color:"#ffffff",textDecorationColor:"#ffffff"}} href={"../../profile/"+props.comment.userId}>{props.comment.author}</a>} {hoursAgo(props.comment.created_at)}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
    )  
} export default CommentCard;
