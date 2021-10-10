import { RouteComponentProps } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import {
  setNewPassword,
  selectAuth,
  resetStatus,
} from "../../features/auth/authSlice";
import { SetNewPasswordPayload } from "../../interfaces";

interface IPasswordResetProps
  extends RouteComponentProps<{ uidb64: string; token: string }> {}

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters"),
  cf_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(6, "Password must be atleast 6 characters"),
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

type IInitialValue = SetNewPasswordPayload & { cf_password: string };

const initialValues: IInitialValue = {
  password: "",
  token: "",
  uidb64: "",
  cf_password: "",
};
const PasswordReset: React.FC<IPasswordResetProps> = ({
  match: {
    params: { uidb64, token },
  },
}) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectAuth);
  const history = useHistory();
  React.useEffect(() => {
    if (status === "success") {
      history.push("/login");
      dispatch(resetStatus());
    }
  }, [status, dispatch, history]);

  const formik = useFormik<IInitialValue>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const { cf_password, ..._values } = values;
      dispatch(setNewPassword({ ..._values, token, uidb64 }));
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cf_password"
              label="Confirm Password"
              type="password"
              id="password"
              value={formik.values.cf_password}
              onChange={formik.handleChange}
              error={
                formik.touched.cf_password && Boolean(formik.errors.cf_password)
              }
              helperText={
                formik.touched.cf_password && formik.errors.cf_password
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" component={RouterLink} variant="body2">
                  Go to Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default PasswordReset;
