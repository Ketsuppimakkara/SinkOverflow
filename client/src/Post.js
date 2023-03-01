import * as React from 'react';
import PostCard from './PostCard.js';
import {useState, useEffect} from 'react';
import './BasicPagination.js';
import {useParams} from 'react-router-dom';
import AddComment from './AddComment.js';
import jwt_decode from 'jwt-decode';


//This is for viewing an individual post. It gets the postId from URL. Id gets passed to API, where parametrized database queries are made.
//This renders a PostCard for the individual post, it adds an edit button if the posts' author is looking at the page.
//First fetches the post, then comments related to it. Comment field is defined in AddComment component.
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
          if(jwt.jwt){                                                                      //If there is a JWT, and the user is the posts' author, they can see the "edit post" button. Otherwise its hidden
            if(postData.data[0].userId === jwt_decode(jwt.jwt).userId){
              editButton = true;
            }
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