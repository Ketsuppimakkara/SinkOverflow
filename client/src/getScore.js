async function getScore(postId){
  return fetch("/api/postVote?postId="+postId)
  .then((response)=>response.json())
  }
export default getScore;
