import React, { useEffect, useState } from 'react'
import useStockRequest from '../services/useStockRequest'
import { useSelector } from 'react-redux';
import { Alert, Box, Button, Typography } from '@mui/material';
import SkeltonCards from '../components/SkeltonCards';
import BrandCard from '../components/brands/BrandCard'; 
import BrandModal from '../components/brands/BrandModal';
import { ErrorMessage, WarningMessage } from '../components/DataFetchMessages';

const Brands = () => {

  const {getDataApi} = useStockRequest();
  const error = useSelector((state)=>state.stock.error)
  const loading = useSelector((state)=>state.stock.loading)
  const brands = useSelector((state)=> state.stock.brands)
  const [open, setOpen] = useState(false);
  const [values,setValues] = useState( {
    name: "", 
    image: "",
  })



  useEffect(()=>{
    getDataApi("brands")
  },[])
  


  return (
    <div>
      <Typography variant='h3' marginy={2} color="greenSpec.main" fontWeight="550" align="center">Brands</Typography>
      {/* New Firm button */}
      <Button variant="contained" marginy={2} onClick={() => setOpen(true)} sx={{marginBottom:"25px"}}>
        NEW BRAND
      </Button>
      <BrandModal open={open} setOpen={setOpen} values={values} setValues={setValues}/>
     
     
    


    {loading ? <Box marginLeft={12} marginRight={12}><SkeltonCards /></Box>  
    : !brands.length ?
     <WarningMessage msg="There is no data to show!"/> 
    : (
<>
      {/* Firms List */}
      <Box display="flex" flexWrap='wrap' gap={2} justifyContent="center" alignItems="center"   marginy={5}>
       {brands?.map(brand => <BrandCard key={brand._id} brand={brand} setValues={setValues} setOpen={setOpen} />)}
      </Box></>
    )}
    
    </div>
  )
}

export default Brands