import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* Config Toastify START */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        theme={themeMode}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        hideProgressBar={false}
      />
      {/* Config Toastify END */}

      {/* Material UI reset CSS START */}
      <CssBaseline />
      {/* Material UI reset CSS END */}
    </ThemeProvider>
  );
};

export default App;
