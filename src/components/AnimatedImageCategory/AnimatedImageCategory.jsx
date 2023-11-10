import React from "react";
import { Animated, Image } from "react-native";
import styles from "./AnimatedImageCategory.style";

const AnimatedImageCategory = ({ scrollY, currentTheme, data, category }) => {
  return (
    <Animated.View
      style={[
        styles.containerCategory,
        {
          backgroundColor: currentTheme.backgroundColor,
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [1, 0.5],
                extrapolate: "clamp",
              }),
            },
          ],
          opacity: scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [1, 0],
            extrapolate: "clamp",
          }),
        },
      ]}
    >
      <Image
        source={{
          uri: data.find((item) => item.title === category)?.image,
        }}
        style={[
          styles.imageCategory,
          { backgroundColor: currentTheme.backgroundColor },
        ]}
      />
    </Animated.View>
  );
};

export default AnimatedImageCategory;
