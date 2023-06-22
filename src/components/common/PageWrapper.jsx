import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

const PageWrapper = ({ state, children }) => {
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(setAppState(state));
  }, [state]);

  return children;
};

export default PageWrapper;
