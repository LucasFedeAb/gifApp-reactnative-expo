import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  containerEmptyFavorites: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyFavorites: {
    textAlign: "center",
    fontSize: 16,
    padding: 4,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  titleModal: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonModalDelete: {
    backgroundColor: "#FF6347",
    padding: 12,
    textAlign: "center",
    borderRadius: 5,
  },
  buttonModalCancel: {
    backgroundColor: "#121212",
    padding: 12,
    textAlign: "center",
    borderRadius: 5,
  },
  labelButtonModal: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  containerButtonsModal: {
    flexDirection: "row",
    margin: 25,
    gap: 50,
    justifyContent: "space-around",
  },
});
