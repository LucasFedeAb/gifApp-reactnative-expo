import { StyleSheet } from "react-native";
import { colors, colorGreen } from "../../constants/colors";

export default styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    backgroundColor: colorGreen.primary,
    padding: 4,
  },

  buttonBackHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  textHeader: {
    color: colors.light,
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 2,
  },
});
