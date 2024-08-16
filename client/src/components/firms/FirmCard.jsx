import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
 
import { Box } from "@mui/material";
import DeleteFirm from "./DeleteFirm"; 

import BorderColorIcon from "@mui/icons-material/BorderColor";

const FirmCard = ({ firm,setOpen,setValues }) => {
  const {address, _id, phone, image, name}= firm
     const handleOpen = () => {
      setOpen(true)
      setValues(firm)
     }
  return (  
    <Card sx={{width: 345,height:580,paddingLeft:"15px" ,paddingRight:"15px",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingBottom:"15px"}} > 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="greenSpec.main">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
        sx={{ objectFit: "contain" }}
      />
      <Typography
        p={1}
        align="center"
        component="p"
        variant="p"
        color="greenSpec.main"
      >
        {phone}
      </Typography>
      <CardActions>
        <Box component="div" margin="auto" display='flex' alignItems="center" gap={1}>
            <DeleteFirm firmName={name} id={_id} />
          <Button size="small" variant="contained" onClick={handleOpen}><BorderColorIcon /></Button>

           
        </Box>
      </CardActions>
    </Card>
  );
};

export default FirmCard;
