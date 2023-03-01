import * as React from 'react';
import PostCard from './PostCard.js';
import {useState, useEffect} from 'react';
import './BasicPagination.js';
import BasicPagination from './BasicPagination.js';

//This function gets data from api, and renders a PostCard for each post returned.
function Posts(props) {

  //These states contain currently shown posts, current pagination page, number of posts per pagination page and all posts from api
  const [data, setData] = useState(null);
  const [currentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(props.postsPerPage ? props.postsPerPage:10);   //Ternary operator uses prop if its there, otherwise defaults to 10
  const [allData, setAllData] = useState(null);
  
  //This function handles changing of page in child Pagination component. It gets passed to the Pagination component
  //TODO: Add functionality to change how many posts are shown per page. This supports the feature already, but there's no UI for it yet
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
  
  //Main rendering useEffect. Takes a slice of the posts and returns a PostCard component for each.
  useEffect(()=>{
    async function getPosts(){
      if(props.userId){                                         //Fetch only the specified user's posts if userId is provided as a prop (Used in profile pages)
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
//Pagination gets added after the posts container always. This should be changed to be conditional on some prop for example. It's not needed in all cases in profile at the moment.
return(<div className='Posts-Container'>{data} <BasicPagination postsPerPage = {postsPerPage} allData = {!allData ? {}: allData} onChange={handleChange}/></div>);
};
export default Posts;