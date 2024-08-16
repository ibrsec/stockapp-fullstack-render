 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import useStockRequest from '../../services/useStockRequest';
import { toastWarnNotify } from '../../helper/ToastNotify';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteFirm = ({firmName,id}) => {
     
    const {deleteSelectedDataApi} = useStockRequest();


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);toastWarnNotify("Delete cancelled");}
  const handleDeleteOK = () => {
     
    //? - [x]  call delete api
    //? - [x]  get firms after deletion
    //? - [x]  show result
    deleteSelectedDataApi("firms",id);


    //? - [x]  close the box
    setOpen(false)
    




  }

  return (
    <span>
         
        <Button variant="contained" size="small" onClick={handleOpen}><DeleteIcon /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            "{firmName}" firm will be deleted? 
            
          </Typography>
          <Box component="div" marginTop={2} display='flex' justifyContent='center' gap={1} >
            <Button variant="contained" size="small" onClick={handleDeleteOK}>OK</Button>
            <Button variant="contained" size="small" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </span>
  );
}


export default DeleteFirm;