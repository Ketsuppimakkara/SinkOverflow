import { Typography } from '@mui/material';
import * as React from 'react';
import HorizontalScroll from 'react-horizontal-scrolling'

//This is a component which handles code snippet formatting. Takes the text as a prop. Every <code> tag starts a new code segment, and the segment's end is signalled with </code>
//Text within a code snippet preserves their line breaks, so if the viewport is too small, the text gets wrapped with a HorizontalScroll component, allowing for scrolling the text horizontally
function formattedText ({text}){
  const regex = new RegExp('(<code>)|(<\/code>)','g')                       //Regex to find all code tags to see where formatting should go
  const formatted = text.split(regex).filter(function(element){            //This removes undefined values that come due to the regex above.
    return element !== undefined;
  })

  let formatting = false
  let elements = []
  for(let i = 0; i<formatted.length; i++){
    if(formatted[i] === "<code>"){
      formatting = true;
      i++
    }else if(formatted[i] === "</code>"){
      formatting = false;
      i++
    }

    if(formatting === true){
      elements.push(<HorizontalScroll key={i}><pre className='codeSnippet'><code>{formatted[i]}</code></pre></HorizontalScroll>)
    }
    else{
      elements.push(<Typography sx={{fontSize:{xs:"0.6rem", md: "1rem"}}} key={i}>{formatted[i]}</Typography>)
    }
  }

    return(<>{elements}</>)

} export default formattedText;
