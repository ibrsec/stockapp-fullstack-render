 
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
 
import { Box } from "@mui/material";
import DeleteBrand from "./DeleteBrand"; 
import BorderColorIcon from "@mui/icons-material/BorderColor";

const BrandCard = ({ brand,setOpen,setValues }) => {
     const {  _id, image, name } = brand;
     const handleOpen = () => {
      setOpen(true)
      setValues(brand)
     }
  return (  
    <Card sx={{width: 345,height:580,paddingLeft:"15px" ,paddingRight:"15px",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingBottom:"15px"}} > 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="greenSpec.main">
          {name}
        </Typography>
         
      </CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        height="100"
        image={image}
        sx={{ objectFit: "contain" }}
      />
       
      <CardActions>
        <Box component="div" margin="auto" display='flex' alignItems="center" gap={1}>
            <DeleteBrand brandName={name} id={_id} />
            <Button size="small" variant="contained" onClick={handleOpen}><BorderColorIcon /></Button>

            
        </Box>
      </CardActions>
    </Card>
  );
};


export default BrandCard