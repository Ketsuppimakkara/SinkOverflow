async function getScores(){
  return fetch("http://localhost:3001/api/postVote")
.then((response)=>response.json())
  }
export default getScores;
