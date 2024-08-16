import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";  
import { Link, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, CardMedia, CssBaseline } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import useApiRequests from "../services/useApiRequests";
import { useSelector } from "react-redux";

const Login = () => {
  const { loginApi } = useApiRequests();
  const user = useSelector(state=>state.auth.user)
  console.log(user);
  console.log(Boolean(user));

  const loginSchema = object({
    email: string()
      .email("Enter a valid email")
      .required("Email is a required field"),
    password: string()
      .required("Password is a required field")
      .min(8, "Password must be at least  8 characters")
      .max(16, "can't be longer than 16 characters")
      .matches(/\d+/, "Password must contain at least 1 number")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least 1 special character - [@$!%*?&]"
      ),
  });

  return user ? <Navigate to="/stock" /> :(
    <Container maxWidth={false} sx={{ backgroundColor: "whiteSpec.main" }}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          direction="row-reverse" 
          sx={{
            height: "100vh",
            p: 2,
          }}
        >
          <Grid item xs={12} mb={3}>
            {/* <Typography variant="h3" align="center" color="greenSpec.main" fontWeight={550}>
            ULTRA STOCK APP
          </Typography> */}

            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="center"
               
              component="div"
              sx={{ paddingTop: "20px" }}
            >
              <Box
                sx={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "primary.dark",
                  position: "relative",
                  bottom: "1.7px",
                }}
              ></Box>
              <Typography variant="h3" color="#84c3b7" fontWeight="600">
                Stock
              </Typography>
              <Typography variant="h3" color="#568a75" fontWeight="600">
                App
              </Typography>
            </Box>

            <Typography component="p" color="primary" align="right">
              test4@test.com
            </Typography>
            <Typography component="p" color="primary" align="right">
              testTEST?1
            </Typography>
          </Grid>

          <Grid item xs={12} sm={10} md={6}>
            <Avatar
              sx={{
                backgroundColor: "blueSpec.main",
                m: "auto",
                width: 40,
                height: 40,
              }}
            >
              <LockIcon size="30" />
            </Avatar>
            <Typography
              variant="h4"
              align="center"
              mb={4}
              color="primary.light"
            >
              Login
            </Typography>

            <Formik
              initialValues={{
                email: "",
                password: "",
                // email: "testba@test.com",
                // password: "Ba10sec45?",
              }}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => {
                //TODO
                //?prevent defalta gerek yok
                //?input kontrol schemada yapiliyor

                //? ** post (login)
                //? *****result gosterme - toastify
                //? global state guncelleme
                //? navigate
                //? ** form resetleme

                console.log(values);

                //? post (login)
                //? result gosterme - toastify
                //? global state guncelleme
                //? navigate
                loginApi(values);

                //? form resetleme
                actions.resetForm();
                actions.setSubmitting(false);
              }}

              // component={} //*-> burda formun icindeki elementlerini belirtabiliyoruz ama biz. formigin innerHtmlinde call back function ile yapcagiz innerini
            >
              {({
                values,
                handleChange,
                handleBlur,
                touched,
                errors,
                isSubmitting,
              }) => (
                <Form>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      label="Email"
                      name="email"
                      id="email"
                      type="email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      // onDoubleClick={(e)=>{e.target.value="aaaa@dffd.csds"}}
                    />
                    <TextField
                      label="password"
                      name="password"
                      id="password"
                      type="password"
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}

                      // onDoubleClick={(e)=>{e.target.value="aaaAAAA23?"}}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                      sx={{ backgroundColor: "#545A4F" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

            <Box
              sx={{
                textAlign: "center",
                mt: 2,
                "& a": { color: "blueSpec.main" },
                "& a:hover": { color: "greenSpec.main" },
              }}
            >
              <Link to="/register">Do you have not an account?</Link>
            </Box>
          </Grid>

          <Grid item xs={11} sm={10} md={6}>
            <Container sx={{width:"120%"}}>
              <CardMedia
                component="img"
                alt="green iguana"
                // height="140"
                image={image}
                sx={{ objectFit: "cover",width:"100%" }}
              />
              {/* <img src={image} alt="img" /> */}
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Login;
