//Simple function gets the vote scores of all posts
async function getScores(){
  return fetch("/api/postVote")
.then((response)=>response.json())
  }
export default getScores;
