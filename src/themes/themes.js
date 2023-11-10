import { colorGreen } from "../constants/colors";

export const lightMode = {
  backgroundColor: "#fff",
  textColor: "#000",
  color: "#000",
  statusBarColor: "dark",

  tabBarBackgroundColor: colorGreen.quaternary,
  tabIconFocus: colorGreen.primary,
  tabIconColor: "#000",
  tabLabelFocus: colorGreen.primary,
  primary: colorGreen.primary,
  secondary: colorGreen.secondary,
  tertiary: colorGreen.tertiary,
  quaternary: colorGreen.quaternary,
  dark: "#1a1c29",
};

export const darkMode = {
  backgroundColor: "#121212",
  textColor: "#fff",
  color: "#fff",
  tabBarBackgroundColor: "#000",
  statusBarColor: "light",
  tabLabelFocus: "#fff",
  tabIconColor: "#ccc",
  tabIconFocus: "#fff",
  primary: colorGreen.primary,
  secondary: colorGreen.secondary,
  tertiary: colorGreen.tertiary,
  quaternary: colorGreen.quaternary,
};
