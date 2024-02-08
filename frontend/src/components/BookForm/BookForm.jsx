import "./BookForm.css";
import booksData from "../../data/books.json";
import { addBook, clearAllBooks } from "../../redux/books/actionCreators";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  function handleAddRandomBook() {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    const book = { ...randomBook, id: uuidv4(), isFavorite: false };
    dispatch(addBook(book));
  }

  function handleClearAllBooks() {
    dispatch(clearAllBooks());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (title && author) {
      const book = {
        id: uuidv4(),
        title: title,
        author: author,
        isFavorite: false,
      };
      dispatch(addBook(book));

      setTitle("");
      setAuthor("");
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
        <button type="button" onClick={handleClearAllBooks}>
          Burn the library
        </button>
      </form>
    </div>
  );
}
