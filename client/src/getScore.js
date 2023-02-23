async function getScore(postId){
  return fetch("http://localhost:3001/api/postVote?postId="+postId)
  .then((response)=>response.json())
  }
export default getScore;
