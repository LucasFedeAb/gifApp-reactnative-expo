import React, { useState } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FavoriteButton = ({ isFavorite, onPress, styleCustom }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const animateIcon = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      style={styleCustom}
      onPress={() => {
        onPress();
        animateIcon();
      }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Ionicons
          name={isFavorite ? "heart" : "add-circle-outline"}
          size={25}
          color={isFavorite ? "darkorange" : "lightgray"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
