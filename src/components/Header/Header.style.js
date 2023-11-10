import { StyleSheet } from "react-native";
import { colorGreen, colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { fontsType } from "../../constants/fontsType";

export default styles = StyleSheet.create({
  nav: {
    flex: 1,
    width: "100%",
    height: 100,
    maxHeight: 100,
    backgroundColor: colorGreen.primary,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    zIndex: 999,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
    height: 130,
  },
  sidebarIcon: {
    paddingLeft: spacing.s,
    color: colors.light,
  },
  endIcon: {
    paddingRight: spacing.s,
    color: colors.light,
  },
  logo: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.logo,
  },
  titleDetail: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.logo,
    paddingRight: "10%",
    paddingBottom: "1%",
  },

  sidebar: {
    position: "absolute",
    top: 25,
    left: 0,
    width: "100%",
    height: 3000,
    zIndex: 10,
  },
  sidebarContent: {
    height: 3000,
    padding: spacing.m,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.s,
  },
  sidebarCloseIcon: {
    alignSelf: "flex-end",
    padding: spacing.s,
  },
  sidebarLogo: {
    fontSize: 24,
    color: colors.logo,
    fontFamily: fontsType.bold,
  },
  sidebarNavLinks: {
    paddingHorizontal: spacing.xs,
    marginTop: spacing.xxxl,
  },
  sidebarNavLink: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  sidebarNavLinkText: {
    fontSize: 17,
    fontWeight: "400",
    color: colors.light,
    paddingLeft: spacing.s,
  },
});
