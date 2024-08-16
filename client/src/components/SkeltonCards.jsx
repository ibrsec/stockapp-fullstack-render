
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';


const SkeltonCards = () => {
    const [loading,setLoading] = useState(true)

  return (
    <Grid container display="flex" flexWrap='wrap' gap={1} justifyContent="space-between" alignItems="center"   marginy={5}  >
      {[1,2,3,4,5,6,7,8,9,10,11,12]?.map((item, index) => (
          
          
          
          <Grid item key={index} sx={{ width: 345 }}>
              <Skeleton />
              <Skeleton />
            <Skeleton variant="rectangular" width={345} height={165} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="60%" /> 
              <Skeleton />
            </Box>
        </Grid>
           
      ))}
    </Grid>
  );
}

export default SkeltonCards;
 

 
