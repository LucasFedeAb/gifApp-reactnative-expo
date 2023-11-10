import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  wrapperStyle: {
    justifyContent: "space-around",
  },
  gifTrending: {
    margin: 0,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  },
  loaderText: {
    color: "white",
    fontSize: 18,
  },
});
