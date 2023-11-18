import { configureStore } from "@reduxjs/toolkit";
import gifsSlice from "../features/gifsSlice/gifsSlice";
import themeSlice from "../features/themeSlice/themeSlice";
import authSlice from "../features/authSlice/authSlice";
import favoritesSlice from "../features/favoritesSlice/favoritesSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gifsApi } from "../services/gifsApi";
import { authApi } from "../services/authApi";
import { infoUserApi } from "../services/infoUserApi";
import { giphyApi } from "../services/giphyApi";

const store = configureStore({
  reducer: {
    gifs: gifsSlice,
    theme: themeSlice,
    auth: authSlice,
    favorites: favoritesSlice,
    [gifsApi.reducerPath]: gifsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [infoUserApi.reducerPath]: infoUserApi.reducer,
    [giphyApi.reducerPath]: giphyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      gifsApi.middleware,
      authApi.middleware,
      infoUserApi.middleware,
      giphyApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
