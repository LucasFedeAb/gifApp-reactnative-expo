import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritesGifs: [],
  resetFavorites: false,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favoritesGifs.push(action.payload);
      state.isSaved = true;
    },
    removeFavorite: (state, action) => {
      state.favoritesGifs = state.favoritesGifs.filter(
        (gif) => gif !== action.payload
      );
      state.isSaved = false;
    },
    setFavoritesGifs: (state, action) => {
      state.favoritesGifs = action.payload;
    },
    setResetFavorites: (state, action) => {
      state.resetFavorites = action.payload;
      state.isSaved = false;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  setFavoritesGifs,
  setResetFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
