import { View, Image } from "react-native";
import React from "react";
import styles from "./Splash.style";

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.ibb.co/JqRmHhg/splash-Beta.jpg" }}
        style={styles.image}
      />
    </View>
  );
};

export default Splash;
