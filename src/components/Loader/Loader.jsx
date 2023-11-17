import { ActivityIndicator, View } from "react-native";
import React from "react";
import styles from "./Loader.style";

const Loader = ({ size = size || 40, color = color || "#00BF63" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;
