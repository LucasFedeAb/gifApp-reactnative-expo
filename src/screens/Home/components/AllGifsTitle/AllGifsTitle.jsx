import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import styles from "./AllGifsTitle.style";
import Header from "@components/Header/Header";
import Gif from "../../../../components/Gif/Gif";
import { useSelector } from "react-redux";

const AllGifsTitle = ({ route }) => {
  const { gifs, title } = route.params || { gifs: [] };
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [uniqueGifs, setUniqueGifs] = useState([]);

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
    </>
  );
};

export default AllGifsTitle;
