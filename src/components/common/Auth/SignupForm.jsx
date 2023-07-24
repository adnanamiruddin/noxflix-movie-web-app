import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setAuthModalOpen } from "../../../redux/features/authModalSlice";
import userApi from "../../../api/modules/user.api";
import { setUser } from "../../../redux/features/userSlice";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    initialValues: {
      username: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Minimum 8 characters for user name")
        .required("Username is required!"),
      displayName: Yup.string()
        .min(8, "Minimum 8 characters for display name")
        .required("Display name is required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters for password")
        .required("Password is required!"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Confirm password does not match with your password"
        )
        .min(8, "Minimum 8 characters for confirm password")
        .required("Confirm password is required!"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, error } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign up success");
      }

      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username..."
          name="username"
          value={signupForm.values.username}
          fullWidth
          color="success"
          onChange={signupForm.handleChange}
          helperText={signupForm.touched.username && signupForm.errors.username}
          error={
            signupForm.touched.username &&
            signupForm.errors.username !== undefined
          }
        />
        <TextField
          type="text"
          placeholder="nickname..."
          name="displayName"
          value={signupForm.values.displayName}
          fullWidth
          color="success"
          onChange={signupForm.handleChange}
          helperText={
            signupForm.touched.displayName && signupForm.errors.displayName
          }
          error={
            signupForm.touched.displayName &&
            signupForm.errors.displayName !== undefined
          }
        />
        <TextField
          type="password"
          placeholder="password..."
          name="password"
          value={signupForm.values.password}
          fullWidth
          color="success"
          onChange={signupForm.handleChange}
          helperText={signupForm.touched.password && signupForm.errors.password}
          error={
            signupForm.touched.password &&
            signupForm.errors.password !== undefined
          }
        />
        <TextField
          type="password"
          placeholder="confirm password..."
          name="confirmPassword"
          value={signupForm.values.confirmPassword}
          fullWidth
          color="success"
          onChange={signupForm.handleChange}
          helperText={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword
          }
          error={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword !== undefined
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        loading={isLoginRequest}
        fullWidth
        sx={{ marginTop: 4 }}
        size="large"
        variant="contained"
      >
        Sign Up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Sign In
      </Button>

      {errorMessage ? (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default SignupForm;
