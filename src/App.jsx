import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import MainLayout from "./components/layout/MainLayout";
import PageWrapper from "./components/common/PageWrapper";
import themeConfigs from "./configs/theme.configs";
import routes from "./routes/routes";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* Config Toastify START */}
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        theme={themeMode}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      {/* Config Toastify END */}

      {/* Material UI reset CSS START */}
      <CssBaseline />
      {/* Material UI reset CSS END */}

      {/* App Routest START */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, i) =>
              route.index ? (
                <Route
                  index
                  key={i}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* App Routest END */}
    </ThemeProvider>
  );
};

export default App;
