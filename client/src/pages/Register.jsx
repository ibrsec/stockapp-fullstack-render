import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import useApiRequests from "../services/useApiRequests";
import { CardMedia, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();

  const user = useSelector(state=>state.auth.user)

  const { registerApi } = useApiRequests();

  const registerSchema = object({
    username: string()
      .required("User name is a required field")
      .max(16, "can't be longer than 16 characters"),
    firstName: string()
      .required("First name is a required field")
      .max(16, "can't be longer than 16 characters"),
    lastName: string()
      .required("Last name is a required field")
      .max(16, "can't be longer than 16 characters"),
    email: string()
      .email()
      .required("Email is a required field")
      .max(30, "can't be longer than 16 characters"),
    password: string()
      .required("Password is a required field")
      .min(8, "must be at least 8 characters")
      .max(16, "can't be longer than 16 characters")
      .matches(/\d+/, "must contain at least 1 number")
      .matches(/[a-z]/, "must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "must contain at least 1 uppercase letter")
      .matches(
        /[@$!%*?&]/,
        "must contain at least 1 special character - [@$!%*?&]"
      ),
  });
  return user ? <Navigate to="/stock" /> : (
    <Container maxWidth={false}   sx={{minHeight:"102.7vh", backgroundColor: "whiteSpec.main" }}>
      <Container maxWidth="lg">
      <CssBaseline />
        <Grid
          container
          justifyContent="center"
          direction="row-reverse"
          rowSpacing={{ sm: 3 }}
          sx={{
            height: "100vh",
            p: 2,
          }}
        >
          <Grid item xs={12}>
            {/* <Typography variant="h3" color="primary" align="center">
            STOCK APP
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
              mb={2}
              color="secondary.light"
            >
              Register
            </Typography>
            <Formik
              initialValues={{
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={registerSchema}
              onSubmit={(values, actions) => {
                //? check values
                //? post (register)
                //? show result toastify
                //? global states
                //? navigate to stock
                //? reset form

                //? check values
                console.log(values);

                //? post (register)
                //? show result toastify
                //? global states
                //? navigate to stock
                registerApi(values);

                //?reset Form
                actions.resetForm();
                actions.setSubmitting(false);
              }}
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
                      label="User Name"
                      name="username"
                      id="userName"
                      type="text"
                      variant="outlined"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && Boolean(errors.username)}
                      helperText={errors.username}
                    />
                    <TextField
                      label="First Name"
                      name="firstName"
                      id="firstName"
                      type="text"
                      variant="outlined"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={errors.firstName}
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      id="last_name"
                      type="text"
                      variant="outlined"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={errors.lastName}
                    />
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
                      helperText={errors.email}
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
                      helperText={errors.password}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

            <Box sx={{ textAlign: "center", mt: 2,"& a":{color:"blueSpec.main"},"& a:hover":{color:"greenSpec.main"} }}>
              <Link to="/">Do you have an account?</Link>
            </Box>
          </Grid>

          
          <Grid item xs={11} sm={10} md={6} alignSelf="center">
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

export default Register;

// {username: 'testba', firstName: 'testba', lastName: 'testba', email: 'testba@test.com', password: 'Ba10sec45?'}
// {username: 'test1', firstName: 'test1', lastName: 'test1', email: 'test1@test.com', password: 'testTEST?1'}
//{username: 'test2', firstName: 'test2', lastName: 'test2', email: 'test2@test.com', password: 'testTEST?1'}
//{username: 'test3', firstName: 'test3', lastName: 'test3', email: 'test3@test.com', password: 'testTEST?1'}
//{username: 'test4', firstName: 'test4', lastName: 'test4', email: 'test4@test.com', password: 'testTEST?1'}
//{username: 'test6', firstName: 'test6', lastName: 'test6', email: 'test6@test.com', password: 'testTEST?1'}
