 
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import img404 from '../assets/404.svg';
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor:"whiteSpec.main",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} sx={{width:"100%"}}>
          <Grid xs={12} md={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6" >
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={()=>navigate("/")} sx={{marginTop:"1rem"}} >Back Home</Button>
          </Grid>
          <Grid xs={12} md={6} sx={{width:"100%"}}>
            <img
              src={img404}
              alt="404"
              sx={{width:"100%"}} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}