import { StyleSheet } from "react-native";
import { colorGreen } from "../../../constants/colors";
import { fontsType } from "../../../constants/fontsType";

export default styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#396156",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  textHeader: {
    fontSize: 20,
    fontFamily: fontsType.medium,
    letterSpacing: 2,
    color: "#fff",
  },
  container: {
    flex: 6,
    backgroundColor: "#121212",
  },
  containerContentImage: {
    marginTop: "-15%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerImage: {
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 8,
    position: "relative",
  },
  trashIcon: {
    ...StyleSheet.absoluteFillObject,
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "orange",
    borderWidth: 8,
  },

  cameraImage: {
    position: "absolute",
    bottom: 10,
    left: 40,
    backgroundColor: "#396156",
    borderRadius: 25,
    padding: 10,
    zIndex: 10,
  },
  userEmail: {
    padding: 16,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorGreen.primary,
    backgroundColor: "#e65f07",
    marginHorizontal: "10%",
    borderRadius: 5,
  },
  emailText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: fontsType.semiBold,
    letterSpacing: 1.5,
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogout: {
    marginTop: 75,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "darkred",
    padding: 16,
    borderRadius: 10,
  },
  labelButtonLogout: {
    color: "#fff",
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
  buttonModal: {
    backgroundColor: "#e65f07",
    padding: 12,
    textAlign: "center",
    borderRadius: 5,
  },
  buttonModalDelete: {
    backgroundColor: "darkred",
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
  containerToast: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
