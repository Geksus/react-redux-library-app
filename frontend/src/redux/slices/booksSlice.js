import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createBookWithID } from "../../utils/createBookWithID";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoading: false,
};

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

export const fetchDelayedBook = createAsyncThunk(
  "books/fetchDelayedBook",
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
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
    clearAllBooks: (state) => {
      return { ...state, books: [] };
    },
  },

  // Option 1

  // extraReducers: {
  //   [fetchBook.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [fetchBook.rejected]: (state) => {
  //     state.isLoading = false;
  //   },
  //   [fetchBook.fulfilled]: (state = initialState, action) => {
  //     state.isLoading = false;
  //     if (action.payload.title && action.payload.author) {
  //       state.books.push(createBookWithID(action.payload, "API"));
  //     }
  //   },
  //   [fetchDelayedBook.fulfilled]: (state = initialState, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.books.push(createBookWithID(action.payload, "API-Delayed"));
  //     }
  //   },
  // },

  // Option 2

  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state = initialState, action) => {
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, "API"));
      }
    });
    builder.addCase(
      fetchDelayedBook.fulfilled,
      (state = initialState, action) => {
        state.isLoading = false;
        if (action.payload.title && action.payload.author) {
          state.books.push(createBookWithID(action.payload, "API-Delayed"));
        }
      }
    );
    builder.addCase(fetchDelayedBook.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchDelayedBook.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { addBook, deleteBook, toggleFavorite, clearAllBooks } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoading = (state) => state.books.isLoading;

export default booksSlice.reducer;
