import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import './style.css'
import Cookies from 'js-cookie';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}))


const defaultTheme = createTheme();


export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" })


  const onSubmit = (data) => {
    
    try {
      axios.post('/user/', data).then((res) => {
        // console.log(res, res.data.token, "lkk");
        localStorage.setItem('signUp', "signUp Sucessful")
        Cookies.set('token', res.data.token, { expires: 1, secure: true });
        navigate('/')
      })
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <GoogleOAuthProvider clientId="486397303916-ald0l7akbonc5na8omth9j7f4tuntmce.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  // console.log(decoded, "decodede");
                  if (decoded) {
                    let data = {
                      firstName: decoded?.given_name,
                      lastName: decoded?.family_name,
                      emailId: decoded?.email,
                      email_verified: decoded?.email_verified
                    }

                    axios.post('/user/signUPWithGoogel', data).then((res) => {
                      // console.log(res, res.data.token, "sign Up with googel");
                      localStorage.setItem('signUp', "signUp Sucessful")
                      Cookies.set('token', res.data.token, { expires: 1, secure: true });
                      navigate('/')
                    })
                    
                  }
                  else{
                    
                  }






                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
            <Root>
              <Divider>OR</Divider>
            </Root>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  {...register("firstName", { required: "First name is required" })}
                />
                <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className='errorMessage'>{message}</p>} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  {...register("lastName", { required: "last name is required" })}
                />
                <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className='errorMessage'>{message}</p>} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="emailId"
                  {...register("emailId", { required: "Email is required" })}
                />
                <ErrorMessage errors={errors} name="emailId" render={({ message }) => <p className='errorMessage'>{message}</p>} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password", { required: "Password is required" })}
                />
                <ErrorMessage errors={errors} name="password" render={({ message }) => <p className='errorMessage'>{message}</p>} />
              </Grid>

            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => navigate('/logIn')}> Already have an account? Sign in

                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>


      </ThemeProvider>

    </>
  );
}