import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { Box, Stack, TextField } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Utils/Container";
import { LoadingButton } from "@mui/lab";

const PasswordUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const updatePasswordForm = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Minimum 8 characters for password")
        .required("Password is required!"),
      newPassword: Yup.string()
        .min(8, "Minimum 8 characters for new password")
        .required("New password is required!"),
      confirmNewPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword")],
          "Confirm new password does not match with your new password"
        )
        .min(8, "Minimum 8 characters for confirm new password")
        .required("Confirm new password is required!"),
    }),
    onSubmit: async (values) => onUpdatePassword(values),
  });

  const onUpdatePassword = async (values) => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, error } = await userApi.updatePassword(values);
    setOnRequest(false);

    if (response) {
      updatePasswordForm.resetForm();
      navigate("/");
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success("Successfully updated password! Please login again");
    }
    if (error) toast.error(error.message);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Update Password">
        <Box
          component="form"
          maxWidth="400px"
          onSubmit={updatePasswordForm.handleSubmit}
        >
          <Stack spacing={3}>
            <TextField
              type="password"
              placeholder="password..."
              name="password"
              value={updatePasswordForm.values.password}
              fullWidth
              color="success"
              onChange={updatePasswordForm.handleChange}
              helperText={
                updatePasswordForm.touched.password &&
                updatePasswordForm.errors.password
              }
              error={
                updatePasswordForm.touched.password &&
                updatePasswordForm.errors.password !== undefined
              }
            />
            <TextField
              type="password"
              placeholder="new password..."
              name="newPassword"
              value={updatePasswordForm.values.newPassword}
              fullWidth
              color="success"
              onChange={updatePasswordForm.handleChange}
              helperText={
                updatePasswordForm.touched.newPassword &&
                updatePasswordForm.errors.newPassword
              }
              error={
                updatePasswordForm.touched.newPassword &&
                updatePasswordForm.errors.newPassword !== undefined
              }
            />
            <TextField
              type="password"
              placeholder="confirm new password..."
              name="confirmNewPassword"
              value={updatePasswordForm.values.confirmNewPassword}
              fullWidth
              color="success"
              onChange={updatePasswordForm.handleChange}
              helperText={
                updatePasswordForm.touched.confirmNewPassword &&
                updatePasswordForm.errors.confirmNewPassword
              }
              error={
                updatePasswordForm.touched.confirmNewPassword &&
                updatePasswordForm.errors.confirmNewPassword !== undefined
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              Update My Password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PasswordUpdate;
