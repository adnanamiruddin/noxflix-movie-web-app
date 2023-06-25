import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Headerbar from "../common/Headerbar";
import AuthModal from "../common/AuthModal";
import { setListFavorites, setUser } from "../../redux/features/userSlice";
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, error } = await favoriteApi.getList();

      if (response) dispatch(setListFavorites(response))
      if (error) dispatch(error.message)
    };

    if (user) getFavorites()
    if (!user) dispatch(setListFavorites([]))
  }, [user, dispatch]);

  return (
    <div>
      {/* Global Loading START */}
      <GlobalLoading />
      {/* Global Loading END */}

      {/* Login Modal START */}
      <AuthModal />
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
