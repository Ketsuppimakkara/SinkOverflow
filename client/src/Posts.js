import * as React from 'react';
import PostCard from './PostCard.js';
import {useState, useEffect} from 'react';
import './BasicPagination.js';
import {Button} from '@mui/material';
import BasicPagination from './BasicPagination.js';
import getScores from './getScores.js'


function Posts(props) {
  let buttonMode = "contained"
  let buttonColor = "primary"
  if(!props.jwt){

    buttonMode = "outlined"
    buttonColor = "secondary"
  }

  const [data, setData] = useState(null);
  const [currentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [allData, setAllData] = useState(null);
  let scoreArray = [];

  const handleChange = (event, value, scoreArray) => {
    window.scrollTo(0,0)
    indexOfLastRecord = value*postsPerPage;
    indexOfFirstRecord = indexOfLastRecord - postsPerPage;
    const posts = allData.slice(indexOfFirstRecord,indexOfLastRecord).map(post=>{
      return(
          <PostCard post = {post} score={post.voteScore} jwt={props.jwt} commentLink={true} key={post.postId}/>
      )})
    setData(posts)

  };

  let indexOfLastRecord = currentPage * postsPerPage;
  let indexOfFirstRecord = indexOfLastRecord - postsPerPage;
  
  useEffect(()=>{
    async function getPosts(){
      fetch("http://localhost:3001/api/posts")
        .then((response) => response.json())
        .then(data =>{
          setAllData(data.data);
          const posts = data.data.slice(indexOfFirstRecord,indexOfLastRecord).map(post=>{
            return(
                <PostCard post = {post} score={post.voteScore} jwt={props.jwt} commentLink={true} key={post.postId}/>
            )
            })

            if(mounted === true){
              setData(posts)
            } 
        });
      }
    
  let mounted = true;
  getPosts();
  return()=>{
    mounted = false
  }
},[])

return(<div className='Posts-Container'>{data} <BasicPagination postsPerPage = {postsPerPage} allData = {!allData ? {}: allData} onChange={handleChange}/> <Button href='/post/new.html' color={buttonColor} variant={buttonMode} sx={{ my: 2, fontSize:"0.7rem"}}>Add a Post</Button> </div>);
};
export default Posts;