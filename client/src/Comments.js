import * as React from 'react';
import CommentCard from './CommentCard.js';
import {useState, useEffect} from 'react';
import './BasicPagination.js';
import {useParams} from 'react-router-dom';
import jwt_decode from 'jwt-decode';


function Comments({jwt, userId}) {

  let {id} = useParams()

  const [data, setData] = useState(null);
  let apiMode = "postId"
  let includeLink = false;

  if(userId){
    apiMode = "userId"
    id  = userId
    includeLink = true          //This adds a link to the comment's parent post if we are getting only posts by a single user (This is used in profile page)
  }

    useEffect(()=>{
      async function getComments(){
        fetch("/api/comments?"+apiMode+"="+id)
        .then((response) => response.json())
        .then(data =>{
          const comments = data.data.map(comment=>{
            return(
                <CommentCard comment = {comment} withLink={includeLink} key={comment.commentId}/>
            )
            })
            if(mounted === true){
              setData(comments)
            } 
        });
    }
  
    let mounted = true;
    getComments();
    return()=>{
      mounted = false
    }
  },[])
  return(<div className='Posts-Container'>{data}</div>);
  }

export default Comments;