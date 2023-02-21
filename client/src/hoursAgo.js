function hoursAgo(timestamp){
    const timestampUnix = Date.parse(timestamp)
    const now = new Date()
    now.setTime(new Date().getTime())
    const timeZoneOffset = now.getTimezoneOffset()*60000
    const millisecondsAgo = ((Date.parse(now)+timeZoneOffset)-timestampUnix);
    const secondsAgo = Math.floor(millisecondsAgo/1000)
    const minutesAgo = Math.floor(secondsAgo/60)
    const hoursAgo = Math.floor(minutesAgo/60)
    const daysAgo = Math.floor(hoursAgo/24)
    const weeksAgo = Math.floor(daysAgo/7)
    const monthsAgo = Math.floor(weeksAgo/4)
    const yearsAgo = Math.floor(monthsAgo/12)
  
    if(yearsAgo !== 0){
      if(yearsAgo === 1){
        return(yearsAgo+" year ago")
      }
      else{
        return(yearsAgo+" years ago")
      }
    }
  
    if(monthsAgo !== 0){
      if(monthsAgo === 1){
        return(monthsAgo+" month ago")
      }
      else{
        return(monthsAgo+" months ago")
      }
    }
  
    if(weeksAgo !== 0){
      if(weeksAgo === 1){
        return(weeksAgo+" week ago")
      }
      else{
        return(weeksAgo+" weeks ago")
      }
    }
  
    if(daysAgo !== 0){
      if(daysAgo === 1){
        return(daysAgo+" day ago")
      }
      else{
        return(daysAgo+" days ago")
      }
    }
  
    if(hoursAgo !== 0){
      if(hoursAgo === 1){
        return(hoursAgo+" hour ago")
      }
      else{
        return(hoursAgo+" hours ago")
      }
    }
  
    if(minutesAgo !== 0){
      if(minutesAgo === 1){
        return(minutesAgo+" minute ago")
      }
      else{
        return(minutesAgo+" minutes ago")
      }
    }
    return("less than a minute ago")
  } export default hoursAgo