import { configureStore } from "@reduxjs/toolkit";
import CartReducer, { setCartFromLocalStorage } from "./slices/CartSlice";
import FavItemSlice, { setFavFromLocalStorage } from "./slices/FavItemSlice";
import { useEffect } from "react";

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    fav: FavItemSlice,
  },
});

// Use subscribe to listen for changes in the store
store.subscribe(() => {
  const state = store.getState();
  console.log("Store Data in localStorage", state);
  localStorage.setItem("localCart", JSON.stringify(state.cart));
  localStorage.setItem("localFav", JSON.stringify(state.fav));
});

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("localCart");
  const storedFav = localStorage.getItem("localFav");

  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);

    store.dispatch(setCartFromLocalStorage(parsedCart));
  }
  if (storedCart) {
    const parsedFav = JSON.parse(storedFav);

    store.dispatch(setFavFromLocalStorage(parsedFav));
  }
};
loadCartFromLocalStorage();
