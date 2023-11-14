import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modal: {
    flex: 1,
    zIndex: 10,
  },
  modalView: {
    width: "90%",
    height: "70%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  favIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 2,
  },
  image: {
    width: "90%",
    height: 350,
    padding: 4,
    marginTop: 45,
    borderRadius: 20,
  },
  title: {
    color: "#fff",
    paddingTop: 24,
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 24,
  },
  buttonShare: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    color: "#fff",
  },
  labelButtonShare: {
    marginHorizontal: 8,
    color: "#fff",
  },
  buttonFavorite: {
    flexDirection: "row",
  },
});
