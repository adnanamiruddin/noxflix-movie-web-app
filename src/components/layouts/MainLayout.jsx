import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";

const MainLayout = () => {
  return (
    <div>
      {/* Global Loading START */}
      <GlobalLoading />
      {/* Global Loading END */}

      {/* Login Modal START */}
      {/* Login Modal END */}

      <Box display="flex" minHeight="100vh">
        {/* Header Section START */}
        {/* Header Section END */}

        {/* Main Section START */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* Main Section END */}

        {/* Footer Section START */}
        {/* Footer Section END */}
      </Box>
    </div>
  );
};

export default MainLayout;
