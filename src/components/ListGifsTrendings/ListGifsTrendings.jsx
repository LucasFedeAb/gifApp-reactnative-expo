import { FlatList, View } from "react-native";
import React from "react";
import Gif from "../Gif/Gif";
import styles from "./ListGifsTrendings.style";

const ListGifsTrendings = ({ data, category }) => {
  const renderItem = ({ item, index }) => {
    return <Gif url={item} index={index} id={item} title={category} />;
  };

  return (
    <>
      {data?.map((item, index) => (
        <View style={styles.trendingContainer} key={item.id}>
          <FlatList
            style={styles.scrollContainer}
            data={item.gifs}
            numColumns={2}
            columnWrapperStyle={styles.wrapperStyle}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => renderItem({ item, index })}
          />
        </View>
      ))}
    </>
  );
};

export default ListGifsTrendings;
