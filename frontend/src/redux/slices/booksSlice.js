import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createBookWithID } from "../../utils/createBookWithID";

const initialState = [];

export const fetchBook = createAsyncThunk("books/fetchBook", async () => {
  const res = await axios.get("http://127.0.0.1:4000/random-book");
  console.log(res.data);
  return res.data;
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state = initialState, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithID(action.payload, "API"));
      }
    });
  },
});

export const { addBook, deleteBook, toggleFavorite, clearAllBooks } =
  booksSlice.actions;

export default booksSlice.reducer;
