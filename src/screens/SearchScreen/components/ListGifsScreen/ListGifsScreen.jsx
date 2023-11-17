import { Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./ListGifsScreen.style";
import { useGetGiphyBySearchQuery } from "../../../../services/giphyApi";
import { useSelector, useDispatch } from "react-redux";
import { setDataGiphy } from "../../../../features/gifsSlice/gifsSlice";
import { useToast } from "../../../../hooks";
import { Header, ListGifs, Loader, Toast } from "@components";
import { colorGreen } from "../../../../constants/colors";

const ListGifsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const searchTerm = useSelector((state) => state.gifs.categorySelected);
  const giphyGifsData = useSelector((state) => state.gifs.dataGiphy);
  const favorites = useSelector((state) => state.favorites.favoritesGifs);
  const lastAction = useSelector((state) => state.favorites.lastAction);

  const { showToast, hideToast } = useToast();
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const [giphyData, setGiphyData] = useState([]);
  const { data, isLoading } = useGetGiphyBySearchQuery({
    category: searchTerm,
  });

  useEffect(() => {
    if (data) {
      dispatch(setDataGiphy(data));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const updateGiphyData = giphyGifsData?.map((gif, index) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.fixed_height.url,
        index: index,
      }));

      setGiphyData(updateGiphyData);
      setIsInitialSearch(false);
    }
  }, [giphyGifsData, favorites]);

  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <Header title={searchTerm} />
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: currentTheme.backgroundColor },
        ]}
      >
        {isInitialSearch && isLoading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Loader />
          </View>
        )}
        {isInitialSearch && !isLoading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Loader />
          </View>
        )}

        {!isInitialSearch && giphyData.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View>
              <Text
                style={{
                  color: currentTheme.color,
                  fontSize: 16,
                  textAlign: "center",
                  padding: 8,
                }}
              >
                Lo sentimos, no se encontraron resultados para tu búsqueda 😕🧐
              </Text>
            </View>
          </View>
        )}

        {!isLoading && giphyData.length > 0 && <ListGifs data={giphyData} />}
        {showToast && lastAction === "addFav" && (
          <Toast
            message={"Se agregó gif a Favoritos"}
            visible={showToast}
            hideToast={hideToast}
            icon={"checkmark"}
            colorText={{ color: colorGreen.quinquenary }}
            iconColor={colorGreen.quinquenary}
          />
        )}
      </SafeAreaView>
      {showToast && lastAction === "removeFav" && (
        <Toast
          message={"Se eliminó gif de Favoritos"}
          visible={showToast}
          hideToast={hideToast}
          lastAction={lastAction}
        />
      )}
    </>
  );
};

export default ListGifsScreen;
