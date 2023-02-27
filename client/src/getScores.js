async function getScores(){
  return fetch("/api/postVote")
.then((response)=>response.json())
  }
export default getScores;
