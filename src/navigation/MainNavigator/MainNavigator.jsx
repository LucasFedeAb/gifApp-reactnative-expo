import React, { useEffect, useState } from "react";
import AuthStackNavigator from "../AuthStackNavigator/AuthStackNavigator";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../services/gifsApi";
import { setUniqueCategories } from "../../features/gifsSlice/gifsSlice";
import { useGetInfoUserQuery } from "../../services/infoUserApi";
import { setUser, setInfoUser } from "../../features/authSlice/authSlice";
import { fetchSession } from "../../db";
import { Splash } from "../../components";

const MainNavigator = () => {
  const dispatch = useDispatch();
  const [loadingSession, setLoadingSession] = useState(true);
  const categories = useSelector((state) => state.gifs.uniqueCategories);
  const { user, localId } = useSelector((state) => state.auth);
  const { data: dataInfoUser } = useGetInfoUserQuery(localId);
  const { data, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (data) {
      let uniqueCategories = [];
      data.map((item) => {
        uniqueCategories.push(item.title);
      });
      dispatch(setUniqueCategories(uniqueCategories));
    }
  }, [data]);

  useEffect(() => {
    if (dataInfoUser) {
      dispatch(setInfoUser(dataInfoUser));
    }
  }, [dataInfoUser]);

  useEffect(() => {
    (async () => {
      try {
        const session = await fetchSession();

        if (session.rows.length) {
          const user = session.rows._array[0];
          dispatch(setUser(user));
        }
      } catch (error) {
        console.log("Error en obtener ususario", error.message);
      } finally {
        setLoadingSession(false);
      }
    })();
  }, []);

  if (loadingSession) {
    return <Splash />;
  }
  if (categories.length < 1) {
    return <Splash />;
  }

  return user && categories ? <BottomTabNavigator /> : <AuthStackNavigator />;
};

export default MainNavigator;
