//Simple function gets the vote score of a specified post
async function getScore(postId){
  return fetch("/api/postVote?postId="+postId)
  .then((response)=>response.json())
  }
export default getScore;
