import { StyleSheet } from "react-native";
import { colorGreen } from "../../../constants/colors";
import { fontsType } from "../../../constants/fontsType";

export default styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#000",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerSVG: {
    width: "100%",
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#26423a",
    borderBottomEndRadius: 300,
    borderBottomStartRadius: 0,
    borderTopStartRadius: 300,
  },
  containerError: {
    width: "100%",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textError: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
  logo: {
    color: "#fff",
    fontSize: 24,
    fontFamily: fontsType.bold,
    marginTop: 24,
  },
  titulo: {
    fontSize: 32,
    color: "#ffff",
    fontWeight: "bold",
    marginTop: 24,
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 16,
  },

  inputEmail: {
    width: "100%",
    backgroundColor: "#000",
    height: 30,
    fontSize: 16,
    paddingLeft: 16,
    color: "#fff",
  },
  inputContainer: {
    width: "90%",
    flexDirection: "row",
    paddingRight: 50,
    alignItems: "center",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colorGreen.primary,
    backgroundColor: "#000",
    color: "#fff",
  },

  textInput: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    /* borderRadius: 30, */
    backgroundColor: "#fff",
  },
  forgotPassword: {
    fontSize: 14,
    color: "gray",
    marginTop: 8,
  },
  noAccount: {
    fontSize: 14,
    color: "gray",
    marginTop: 32,
  },
  termsContainer: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 120,
  },
  terms: {
    color: "gray",
    marginBottom: 12,
    paddingLeft: 4,
    fontSize: 10,
    textAlign: "center",
  },
});
