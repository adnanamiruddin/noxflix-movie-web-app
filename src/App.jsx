import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";

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
