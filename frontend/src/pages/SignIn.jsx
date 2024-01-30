import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoogleLogin } from "@react-oauth/google";

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));
export default function SignIn() {

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" })

  const onSubmit = (data) => {
    console.log(data)
    try {
      axios.post('/user/logIn', data).then((res) => {

        localStorage.setItem('logIn', "logIn Sucessful")
        Cookies.set('token', res.data.token, { expires: 1, secure: true });
        navigate('/')
      })
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <Root>
          <Divider>or</Divider>
        </Root>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"

            fullWidth
            id="email"
            label="Email Address"
            name="emailId"

            // autoFocus
            {...register('emailId', { required: "EmailId is required" })}
          />
          <ErrorMessage errors={errors} name="emailId" render={({ message }) => <p className='errorMessage'>{message}</p>} />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...register('password', { required: "password is required" })}
          />
          <ErrorMessage errors={errors} name="password" render={({ message }) => <p className='errorMessage'>{message}</p>} />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button

            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" onClick={() => navigate('/forgetPassword')}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={() => navigate('/signUp')} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}