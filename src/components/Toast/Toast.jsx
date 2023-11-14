// ToastMessage.js
import React, { useState, useEffect } from "react";
import { Text, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Toast.style.js";

const Toast = ({
  message,
  visible,
  hideToast,
  duration = 500,
  style = {},
  icon = "close",
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      showAnimation();
      const timeout = setTimeout(() => hideToast(), duration);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  const showAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }, style]}>
      <Text style={styles.toastText}>{message}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={() => hideToast()}>
        <Ionicons name={icon} size={20} color="#000" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;
