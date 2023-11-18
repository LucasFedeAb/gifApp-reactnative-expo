import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  localId: null,
  imageCamera: null,
  username: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        user: action.payload.email,
        token: action.payload.idToken,
        localId: action.payload.localId,
      };
    },
    clearUser: () => {
      return {
        user: null,
        token: null,
        localId: null,
      };
    },
    setInfoUser: (state, action) => {
      return {
        ...state,
        imageCamera: action.payload.image,
        username: action.payload.username,
      };
    },
  },
});

export const { setUser, clearUser, setInfoUser } = authSlice.actions;

export default authSlice.reducer;
