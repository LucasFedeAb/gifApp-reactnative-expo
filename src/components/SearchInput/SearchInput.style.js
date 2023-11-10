import { StyleSheet } from "react-native";
import { spacing } from "../../constants/spacing";

export default styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchBox: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  searchFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.s,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    flex: 1,
    marginStart: 30,
  },
  searchField: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    color: "#010718",
  },

  searchIcon: {
    padding: spacing.m,
  },
  closeIcon: {
    padding: spacing.s,
    marginLeft: spacing.s,
  },
});
