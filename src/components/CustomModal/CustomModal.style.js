import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "100%",
    height: "auto",
    borderRadius: 20,
    paddingVertical: 15,
    marginVertical: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },
});
