import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createBookWithID } from "../../utils/createBookWithID";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
    clearAllBooks: () => {
      return [];
    },
  },
});

export async function thunkFunction(dispatch, getState) {
  try {
    const res = await axios.get("http://127.0.0.1:4000/random-book");
    if (res && res.data && res.data.title && res.data.author) {
      dispatch(addBook(createBookWithID(res.data, "API")));
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const { addBook, deleteBook, toggleFavorite, clearAllBooks } =
  booksSlice.actions;

export default booksSlice.reducer;
