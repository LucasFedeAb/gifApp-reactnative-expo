import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./ButtonGradient.style";

const ButtonGradient = ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[
          `#26423a`,
          `#27483f`,
          `#3c675a`,
          `#3c675a`,
          `#396156`,
          `#304b44`,
          `#2c3e37`,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.text}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonGradient;
