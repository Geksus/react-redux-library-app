import "./BookList.css";
import { useSelector } from "react-redux";

export default function BookList() {
  const books = useSelector((state) => state.books);

  return (
    <div className="app-block book-list">
      <h2>Book list</h2>
      <ul>
        {books.length === 0 ? (
          <p>No books in the library</p>
        ) : (
          books.map((book, index) => (
            <li key={index}>
              <div className="book-info">
                {++index}. {book.title} by <strong>{book.author}</strong>
              </div>
              <button>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
