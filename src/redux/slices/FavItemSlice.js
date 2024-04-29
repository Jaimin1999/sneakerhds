import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const FavItemSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    setFavFromLocalStorage: (state, action) => {
      return [...state, ...action.payload];
    },

    setFav: (state, action) => {
      const _id = action.payload.id;

      const index = state.findIndex((fav) => fav.id === _id);

      if (index === -1) {
        return [...state, action.payload];
      } else {
        return state.filter((shoe) => _id !== shoe.id);
      }
    },
    removeFav: (state, action) => {
      state.filter((shoe) => action.payload !== shoe.id);
    },
  },
});

export const { setFavFromLocalStorage, setFav, removeFav } =
  FavItemSlice.actions;
export default FavItemSlice.reducer;
