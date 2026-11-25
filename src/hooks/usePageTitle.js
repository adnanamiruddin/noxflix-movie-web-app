import { useEffect } from "react";

const defaultTitle = "NoxFlix";

const usePageTitle = (title) => {
  useEffect(() => {
    if (!title) return;
    document.title = `${title} | ${defaultTitle}`;

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
};

export default usePageTitle;
