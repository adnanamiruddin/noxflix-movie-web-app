import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Headerbar from "../common/Headerbar";

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
        <Headerbar />
        {/* Header Section END */}

        {/* Main Section START */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* Main Section END */}
      </Box>

      {/* Footer Section START */}
      <Footer />
      {/* Footer Section END */}
    </div>
  );
};

export default MainLayout;
