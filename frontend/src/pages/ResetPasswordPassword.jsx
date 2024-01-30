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
// import Divider from '@mui/material/Divider';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useNavigate  , useParams} from "react-router-dom";
import axios from 'axios';
// import { ToastContainer } from 'react-toastify';
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


export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
 
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({ mode: "all" })


  const onSubmit = async (data) => {
   
    try {
     
      let response = await axios({
        method: 'put',
        url: `/user/updatePassword/${token}`,
        data: data,
      })
      if (response?.status === 200) {
        localStorage.setItem("token",token,response?.token)
        navigate('/')
      }
    }
    catch (err) {
      console.log(err,"err")
    }
  }

  console.log(errors, "kl");

  return (
    <>

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

            <Typography component="h1" variant="h5" sx={{ m: 4 }}>
              Reset Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="New Password"
                  name="newPassword"
                  {...register("newPassword", { required: "Password is required" })}
                />
                <ErrorMessage errors={errors} name="newPassword" render={({ message }) => <p className='errorMessage'>{message}</p>} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="password"

                  {...register("confirmPassword", {
                    required: "Confirm Password is required", validate: (val) => {
                      if (watch('newPassword') != val) {
                        return "Your passwords do no match";
                      }
                    }
                  })}
                />
                <ErrorMessage errors={errors} name="confirmPassword" render={({ message }) => <p className='errorMessage'>{message}</p>} />
              </Grid>

            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Reset Password
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => navigate('/logIn')}> Remember Password

                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>


      </ThemeProvider>

    </>
  );
}