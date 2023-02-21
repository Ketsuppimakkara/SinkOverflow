import * as React from 'react';
import CommentCard from './CommentCard.js';
import {useState, useEffect} from 'react';
import './BasicPagination.js';
import {useParams} from 'react-router-dom';


function Posts(jwt) {

  let {id} = useParams()

  const [data, setData] = useState(null);

  
  useEffect(()=>{
    async function getComments(){
      fetch("http://localhost:3001/api/comments?postId="+id)
      .then((response) => response.json())
      .then(data =>{
        const comments = data.data.map(comment=>{
          return(
              <CommentCard comment = {comment} commentLink={true} key={comment.commentId}/>
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
};
export default Posts;