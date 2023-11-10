import { createSlice } from "@reduxjs/toolkit";
import { lightMode, darkMode } from "../../themes/themes";

const initialState = {
  isDarkMode: true,
  currentTheme: darkMode,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.currentTheme = state.isDarkMode ? darkMode : lightMode;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
