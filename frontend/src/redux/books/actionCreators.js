import * as actionTypes from "./actionTypes.js";

export function addBook(newBook) {
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
}

export function deleteBook(id) {
  return {
    type: actionTypes.DELETE_BOOK,
    payload: id,
  };
}

export function clearAllBooks() {
  return {
    type: actionTypes.CLEAR_ALL_BOOKS,
  };
}

export function toggleFavorite(id) {
  return {
    type: actionTypes.TOGGLE_FAVORITE,
    payload: id,
  };
}
