import * as React from 'react';
import PostCard from './PostCard.js';
import {useState, useEffect} from 'react';
import './BasicPagination.js';
import {Button} from '@mui/material';
import BasicPagination from './BasicPagination.js';


function Posts(props) {


  const [data, setData] = useState(null);
  const [currentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(props.postsPerPage ? props.postsPerPage:10);   //Ternary operator uses prop if its there, otherwise defaults to 10
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
      if(props.userId){                                         //Fetch only the specified user's posts if userId is provided as a prop (Used in looking at profiles)
        fetch("/api/posts?userId="+props.userId) 
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
      else{                                                     //Otherwise fetch all posts (Default mode for getting posts on frontpage)

      
      fetch("/api/posts") 
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
      }
    
  let mounted = true;
  getPosts();
  return()=>{
    mounted = false
  }
},[currentPage])

return(<div className='Posts-Container'>{data} <BasicPagination postsPerPage = {postsPerPage} allData = {!allData ? {}: allData} onChange={handleChange}/></div>);
};
export default Posts;