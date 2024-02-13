import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createBookWithID } from "../../utils/createBookWithID";
import { setError } from "./errorSlice";

const initialState = [];

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

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
  // Option 1

  // extraReducers: {
  //   [fetchBook.fulfilled]: (state = initialState, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.push(createBookWithID(action.payload, "API"));
  //     }
  //   },
  // },

  // Option 2

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
