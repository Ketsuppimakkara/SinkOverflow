import * as React from 'react';
import PostCard from './PostCard.js';
import {useState, useEffect} from 'react';
import './BasicPagination.js';
import {useParams} from 'react-router-dom';
import AddComment from './AddComment.js';



function Post(jwt) {

  let {id} = useParams()

  const [data, setData] = useState(null);

  useEffect(()=>{
    async function getPost(){
      fetch("http://localhost:3001/api/posts?postId="+id)
      .then((response) => response.json())
      .then(postData =>{
        fetch("http://localhost:3001/api/comments?postId="+id)
        .then((commentResponse) => commentResponse.json())
        .then(commentData =>{
          postData.comments = commentData
          const posts = ()=>{
            return(
              <>
                <PostCard post = {postData.data[0]} commentLink = {false} key={postData.data[0].postId}/>
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


return(<><div className='Posts-Container'>{data} </div> <div><AddComment jwt={jwt} postId={id}/></div></>);
};
export default Post;