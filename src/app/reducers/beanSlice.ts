import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type TBean = {
  [key: string]: any;
};

export type TData = {
  [key: string]: any;
  items: TBean[];
  totalPages: number;
};

const initialState: TData = {
  items: [],
  totalPages: 0,
  offset: 0,
};

const beanSlice = createSlice({
  name: "beans",
  initialState,
  reducers: {
    setBeans(state, action) {
      const { items } = action.payload;
      if (items.length) {
        state.items = [...state.items, ...items];
      }
      if (!items.length) {
        state.items = [];
      }
    },
    setTotalPages(state, action) {
      const { totalPages } = action.payload;
      state.totalPages = totalPages;
    },
    setOffset(state) {
      state.offset = state.offset + 1;
    },
  },
});

export const { setBeans, setTotalPages, setOffset } = beanSlice.actions;

export const selectAllBeans = (state: RootState) => state.beans.items;

export const selectTotalPages = (state: RootState) => state.beans.totalPages;

export const selectOffset = (state: RootState) => state.beans.offset;

export const selectBeanById = (state: RootState, id: string) =>
  state.beans.items.find(item => item.id === id);

export default beanSlice.reducer;
