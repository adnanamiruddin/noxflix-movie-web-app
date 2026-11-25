import { Link } from "react-router-dom";
import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";

const NotFound = () => {
  return (
    <div>
      <Toolbar />
      <Box
        sx={{
          ...uiConfigs.style.mainContent,
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography variant="h4" fontWeight="700">
            Page not found
          </Typography>
          <Typography color="text.secondary">
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Button variant="contained" LinkComponent={Link} to="/">
            Back to home
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default NotFound;
