import { StyleSheet } from "react-native";
import { spacing } from "../../constants/spacing";

export default styles = StyleSheet.create({
  trendingContainer: {
    flex: 1,
    width: "100%",
    marginVertical: spacing.s,
  },
  scrollContainer: {
    width: "100%",
    zIndex: 3,
  },
  wrapperStyle: {
    justifyContent: "space-around",
  },
});
