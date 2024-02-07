import * as actionTypes from "./actionTypes.js";

export default function addBook(newBook) {
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
}
