import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  containerCategory: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: 16,
  },

  imageCategory: {
    width: "100%",
    height: 220,
    opacity: 0.9,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    resizeMode: "contain",
  },
});
