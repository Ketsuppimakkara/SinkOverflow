import * as React from 'react';
import PostCard from './PostCard.js';
import {useState, useEffect} from 'react';
import './BasicPagination.js';
import {useParams} from 'react-router-dom';
import AddComment from './AddComment.js';
import jwt_decode from 'jwt-decode';



function Post(jwt) {

  let {id} = useParams()

  const [data, setData] = useState(null);
  let editButton = false;

  useEffect(()=>{
    async function getPost(){
      fetch("/api/posts?postId="+id)
      .then((response) => response.json())
      .then(postData =>{
        fetch("/api/comments?postId="+id)
        .then((commentResponse) => commentResponse.json())
        .then(commentData =>{
          postData.comments = commentData
          if(postData.data[0].userId === jwt_decode(jwt.jwt).userId){
            editButton = true;
          }
          const posts = ()=>{
            return(
              <>
                <PostCard post = {postData.data[0]} commentLink = {false} jwt={jwt.jwt} editButton = {editButton} key={postData.data[0].postId}/>
              </>
            )}
            if(mounted === true){
              setData(posts)
            } 
        })
      });
  }

  let mounted = true;
  getPost();
  return()=>{
    mounted = false
  }
},[])


return(<><div className='Posts-Container'>{data} </div> <><AddComment jwt={jwt} postId={id}/></></>);
};
export default Post;