import { StyleSheet } from "react-native";
import { spacing } from "../../constants/spacing";

export default styles = StyleSheet.create({
  gifsPrincipalContainer: {
    width: "100%",
    marginTop: 230,
    paddingHorizontal: spacing.s,
  },
  containerGifsCharacter: {
    marginVertical: spacing.l,
  },

  headerListGifs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 14,
    marginBottom: spacing.s,
  },
  label: {
    fontSize: 12,
    marginBottom: spacing.s,
  },

  gifsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gif: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
