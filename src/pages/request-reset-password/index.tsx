import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import LoadingButton from "../../components/controls/loading-button";
import {
  requestResetPassword,
  resetStatus,
  selectAuth,
} from "../../features/auth/authSlice";
import { IRequestResetPasswordPayload } from "../../interfaces";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const initialValues: IRequestResetPasswordPayload = {
  email: "",
};

export default function SignIn() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { status } = useAppSelector(selectAuth);

  React.useEffect(() => {
    if (status === "success") {
      history.push("/login");
      dispatch(resetStatus());
    }
  }, [status, history, dispatch]);

  const formik = useFormik<IRequestResetPasswordPayload>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(requestResetPassword(values));
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <div style={{ width: 400 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={status === "loading"}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link to="/login" component={RouterLink} variant="body2">
                  Back To Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
