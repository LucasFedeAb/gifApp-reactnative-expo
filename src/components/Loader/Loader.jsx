import { ActivityIndicator, View } from "react-native";
import React from "react";
import styles from "./Loader.style";

const Loader = ({ size = size || 80, color = color || "#ccc" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;
