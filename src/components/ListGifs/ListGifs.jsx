import { FlatList } from "react-native";
import React from "react";
import styles from "./ListGifs.style";
import Gif from "../Gif/Gif";

const ListGifs = ({ data }) => {
  const renderGif = ({ item, index }) => {
    return (
      <>
        <Gif
          id={item.id}
          url={item.url}
          title={item.title}
          index={index}
          isSaved={item.isSaved}
        />
      </>
    );
  };

  return (
    <>
      <FlatList
        style={styles.container}
        data={data}
        numColumns={2}
        columnWrapperStyle={styles.wrapperStyle}
        keyExtractor={(item) => item.id}
        renderItem={renderGif}
      />
    </>
  );
};

export default ListGifs;
