import { useCallback, useState } from "react";

const emptyList = { page: 1, items: [], totalPages: 0 };

const usePagedList = (key) => {
  const [state, setState] = useState({ key, ...emptyList });

  if (state.key !== key) setState({ key, ...emptyList });

  const current = state.key === key ? state : emptyList;

  const loadMore = () =>
    setState((prev) =>
      prev.key === key ? { ...prev, page: prev.page + 1 } : prev
    );

  const receive = useCallback(
    ({ results, total_pages }, receivedPage) =>
      setState((prev) =>
        prev.key !== key
          ? prev
          : {
              ...prev,
              totalPages: total_pages,
              items: receivedPage > 1 ? [...prev.items, ...results] : results,
            }
      ),
    [key]
  );

  return {
    page: current.page,
    items: current.items,
    totalPages: current.totalPages,
    loadMore,
    receive,
  };
};

export default usePagedList;
