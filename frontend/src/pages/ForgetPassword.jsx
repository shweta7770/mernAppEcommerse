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
import FullScreenDialog from '../bigComponents/FullScreenDialog';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
        marginTop: theme.spacing(2),
    },
}))


const defaultTheme = createTheme();


export default function ForgetPassword() {
    const navigate = useNavigate();
    const [showDialog , setShowDialog]=React.useState(false)
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "all" })


    const onSubmit = (data) => {
        // console.log(data?.emailId, "jkk")
        try {
            axios.post('/user/sendMail', data).then((res) => {
                 console.log(res?.data?.err, "kl");
                if(res?.data?.err === false)
                {
                    setShowDialog(true)
                }
                
            }).catch((err) => {
                console.log(err, "err");
            })
        }
        catch (err) {
            console.log(err)
        }
    }


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
                            Forget Password
                        </Typography>

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
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Send Mail
                            </Button>
                        </Grid>


                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link variant="body2" onClick={() => navigate('/logIn')}> Remember Password

                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>


            </ThemeProvider>
            {showDialog && <FullScreenDialog  showDialog={showDialog} setShowDialog={setShowDialog}/>}
        </>
    );
}