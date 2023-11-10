import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./ListGifsDb.style";
import Gif from "../Gif/Gif";

const ListGifsDb = ({ data }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const navigation = useNavigation();

  const handleAllGifsByTitle = (title) => {
    navigation.navigate("AllGifsTitle", {
      gifs: data,
      title,
    });
  };
  return (
    <View style={styles.gifsPrincipalContainer}>
      {data?.map((item) => (
        <View style={styles.containerGifsCharacter} key={item.id}>
          <View style={styles.headerListGifs}>
            <Text style={[styles.title, { color: currentTheme.textColor }]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => handleAllGifsByTitle(item.title)}>
              <Text
                style={[styles.label, { color: currentTheme.textColor }]}
              >{`Ver más`}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.gifsContainer, {}]}>
            {item.gifs.slice(0, 3).map((gif, index) => (
              <View style={styles.gif} key={index}>
                <Gif
                  url={gif}
                  index={index}
                  heigth={110}
                  width={110}
                  id={gif}
                  title={item.title}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default ListGifsDb;
