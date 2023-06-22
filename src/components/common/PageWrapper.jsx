import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

const PageWrapper = ({ state, children }) => {
  const dispacth = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispacth(setAppState(state));
  }, [state, dispacth]);

  return children;
};

export default PageWrapper;
