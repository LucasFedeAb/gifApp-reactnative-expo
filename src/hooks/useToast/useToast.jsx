import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLastAction } from "../../features/favoritesSlice/favoritesSlice";

const useToast = () => {
  const dispatch = useDispatch();
  const lastAction = useSelector((state) => state.favorites.lastAction);

  const [showToast, setShowToast] = useState(false);

  const showToastMessage = () => {
    setShowToast(true);
  };

  const hideToast = () => {
    dispatch(setLastAction(null));
    setShowToast(false);
  };

  useEffect(() => {
    showToastMessage();
  }, [lastAction]);

  return { showToast, hideToast, showToastMessage };
};

export default useToast;
