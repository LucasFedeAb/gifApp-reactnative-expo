import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import styles from "./AllGifsTitle.style";
import { useSelector } from "react-redux";
import { useToast } from "../../../../hooks";
import { Gif, Header, Toast } from "@components";

const AllGifsTitle = ({ route }) => {
  const { gifs, title } = route.params || { gifs: [] };
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const lastAction = useSelector((state) => state.favorites.lastAction);
  const [uniqueGifs, setUniqueGifs] = useState([]);

  const { showToast, hideToast } = useToast();

  useEffect(() => {
    const filteredGifsByTitle = gifs.filter((item) => item.title === title);
    const updateUniqueGifs = [];
    for (const item of filteredGifsByTitle) {
      for (const gif of item.gifs) {
        const isDuplicate = updateUniqueGifs.includes(gif);
        if (!isDuplicate) {
          updateUniqueGifs.push(gif);
        }
      }
    }

    setUniqueGifs(updateUniqueGifs);
  }, [gifs, title]);

  const renderItem = ({ item, index }) => (
    <Gif
      url={item}
      id={item}
      index={index}
      width={120}
      heigth={180}
      title={title}
    />
  );

  return (
    <>
      <Header title={title} />
      <View
        style={[
          styles.container,
          { backgroundColor: currentTheme.backgroundColor },
        ]}
      >
        <FlatList
          data={uniqueGifs}
          numColumns={3}
          columnWrapperStyle={styles.wrapperStyle}
          renderItem={renderItem}
          keyExtractor={(gif, index) => gif}
        />
      </View>
      {showToast && lastAction === "addFav" && (
        <Toast
          message={"Se agregó gif a Favoritos"}
          visible={showToast}
          hideToast={hideToast}
          icon={"checkmark"}
        />
      )}
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

export default AllGifsTitle;
