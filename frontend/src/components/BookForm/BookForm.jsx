import "./BookForm.css";
import booksData from "../../data/books.json";
import {
  addBook,
  clearAllBooks,
  fetchBook,
  fetchDelayedBook,
  selectIsLoading,
} from "../../redux/slices/booksSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBookWithID } from "../../utils/createBookWithID";
import { setError } from "../../redux/slices/errorSlice";
import { FaSpinner } from "react-icons/fa";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  function handleAddRandomBook() {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithID(randomBook, "random")));
  }

  function handleAddRandomViaApi() {
    dispatch(fetchBook("http://127.0.0.1:4000/random-book"));
  }

  async function handleAddRandomViaDelayedApi() {
    await dispatch(
      fetchDelayedBook("http://127.0.0.1:4000/random-book-delayed")
    );
  }

  function handleClearAllBooks() {
    dispatch(clearAllBooks());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, "manual")));

      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("No title and author"));
    }
  }

  return (
    <div className="app-block book-form">
      <h2>Add new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <button type="submit">Add book</button>
        <br />
        <button type="button" onClick={handleAddRandomBook}>
          Add random book
        </button>
        <br />
        <button
          type="button"
          onClick={handleAddRandomViaApi}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>"Loading..."</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Random book via API"
          )}
        </button>
        <br />
        <button
          type="button"
          onClick={handleAddRandomViaDelayedApi}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>"Loading..."</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Delayed book via API"
          )}
        </button>
        <br />
        <button type="button" onClick={handleClearAllBooks}>
          Burn the library
        </button>
      </form>
    </div>
  );
}
