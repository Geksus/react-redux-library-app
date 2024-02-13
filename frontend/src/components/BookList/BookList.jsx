import "./BookList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBook,
  selectBooks,
  toggleFavorite,
} from "../../redux/slices/booksSlice";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import {
  selectAuthorFilter,
  selectOnlyFavorite,
  selectTitleFilter,
} from "../../redux/slices/filterSlice";

export default function BookList() {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite);
  const dispatch = useDispatch();

  function handleBookDeletion(id) {
    dispatch(deleteBook(id));
  }

  function handleToggleFavorite(id) {
    dispatch(toggleFavorite(id));
  }

  const favoriteBooks = onlyFavoriteFilter
    ? books.filter((book) => book.isFavorite)
    : books;

  const filteredBooks = favoriteBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      book.author.toLowerCase().includes(authorFilter.toLowerCase())
  );

  return (
    <div className="app-block book-list">
      <h2>Book list</h2>
      <ul>
        {books.length === 0 ? (
          <p>No books in the library</p>
        ) : (
          filteredBooks.map((book, index) => (
            <li key={book.id}>
              <div className="book-info">
                {++index}. {book.title} by <strong>{book.author}</strong> (
                {book.source})
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
