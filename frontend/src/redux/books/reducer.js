import * as actionTypes from "./actionTypes.js";

const initialState = [];

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return [...state, action.payload];
    case actionTypes.DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    case actionTypes.CLEAR_ALL_BOOKS:
      return [];
    default:
      return state;
  }
}
