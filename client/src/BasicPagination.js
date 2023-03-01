import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//Returns a pagination component. 
//Takes an array of posts and number of posts to show per page. Calculates the number of pages and returns the component
function BasicPagination(props) {
  return (
    <Stack spacing={2}>
      <Pagination count={props.allData.length ? Math.ceil(props.allData.length/props.postsPerPage):1} color="primary" onChange={props.onChange}/>
    </Stack>
  );
} 
export default BasicPagination;