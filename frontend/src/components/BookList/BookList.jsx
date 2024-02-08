import "./BookList.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import booksReducer from "../../redux/books/reducer";

export default function BookList() {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  function handleBookDeletion(id) {
    dispatch(deleteBook(id));
  }

  function handleToggleFavorite(id) {
    dispatch(toggleFavorite(id));
  }

  return (
    <div className="app-block book-list">
      <h2>Book list</h2>
      <ul>
        {books.length === 0 ? (
          <p>No books in the library</p>
        ) : (
          books.map((book, index) => (
            <li key={book.id}>
              <div className="book-info">
                {++index}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleBookDeletion(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
