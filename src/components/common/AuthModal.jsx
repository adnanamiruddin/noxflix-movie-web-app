import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SignUpForm";

const actionState = {
  signIn: "signin",
  signUp: "signUp",
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.signIn);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signIn);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          position: "absolute",
          top: "50%",
          left: "50%",
          outline: "none",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>

          {action === actionState.signIn ? <SigninForm switchAuthState={() => switchAuthState(actionState.signUp)} /> : ""}
          {action === actionState.signUp ? <SignupForm switchAuthState={() => switchAuthState(actionState.signIn)} /> : ""}

        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
