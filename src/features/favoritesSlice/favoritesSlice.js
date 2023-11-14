import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritesGifs: [],
  resetFavorites: false,
  lastAction: null,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favoritesGifs.push(action.payload);
      state.lastAction = "addFav";
      state.isSaved = true;
    },
    removeFavorite: (state, action) => {
      state.favoritesGifs = state.favoritesGifs.filter(
        (gif) => gif !== action.payload
      );
      state.lastAction = "removeFav";
      state.isSaved = false;
    },
    setFavoritesGifs: (state, action) => {
      state.favoritesGifs = action.payload;
    },
    setResetFavorites: (state, action) => {
      state.resetFavorites = action.payload;
      state.isSaved = false;
    },
    setLastAction: (state, action) => {
      state.lastAction = action.payload;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  setFavoritesGifs,
  setResetFavorites,
  setLastAction,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
