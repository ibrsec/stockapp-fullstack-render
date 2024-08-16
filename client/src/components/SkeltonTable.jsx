
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'; 
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';


const SkeltonTable = () => { 

  return (
    <Grid container display="flex" flexWrap='wrap' gap={1} justifyContent="space-between" alignItems="center"   marginy={5}  >
      {[11]?.map((item, index) => (
          
          
          
          <Grid item key={index} sx={{ width: "100%" }}>
              <Skeleton variant="rectangular"sx={{marginBottom:"1rem"}}   height={50} />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            
        </Grid>
           
      ))}
    </Grid>
  );
}

export default SkeltonTable;
 

 