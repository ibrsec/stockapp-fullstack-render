import { useEffect, useState } from "react"
import useStockRequest from "../services/useStockRequest";
import { Alert, Box, Button, Typography } from "@mui/material";
import FirmCard from "../components/firms/FirmCard";
import { useSelector } from "react-redux";
import FirmModal from "../components/firms/FirmModal"; 
import SkeltonCards from "../components/SkeltonCards";
import { ErrorMessage, WarningMessage } from "../components/DataFetchMessages";

 

const Firms = () => {
const {getDataApi} = useStockRequest();
const [open, setOpen] = useState(false);
const [values,setValues] = useState( {
  name: "",
  phone: "",
  address: "",
  image: "",
})


const firms = useSelector((state)=>state.stock.firms)
const error = useSelector((state)=>state.stock.error)
const loading = useSelector((state)=>state.stock.loading)
// const loading = true
console.log(error);
  useEffect(()=>{
    getDataApi("firms");
// eslint-disable-next-line
  },[])

  console.log('firmsten = ', firms)


  return (
    <div>
      <Typography variant='h3' marginy={2} color="greenSpec.main" fontWeight="550" align="center">Firms</Typography>
      {/* New Firm button */}
      <Button variant="contained" marginy={2} onClick={() => setOpen(true)} sx={{marginBottom:"25px"}}>
        NEW FIRM
      </Button>
    <FirmModal open={open} setOpen={setOpen} values={values} setValues={setValues}/>
   
   
    


    {loading ? <Box marginLeft={12} marginRight={12}><SkeltonCards /></Box>  
    : !firms.length ?
     <WarningMessage msg="There is no data to show!"/> 
    :  (
<>
      {/* Firms List */}
      <Box display="flex" flexWrap='wrap' gap={2} justifyContent="center" alignItems="center"   marginy={5}>
       {firms?.map(firm => <FirmCard key={firm._id} firm={firm} setValues={setValues} setOpen={setOpen} />)}
      </Box></>
    )}
    
    

      
    </div>
  )
}

export default Firms