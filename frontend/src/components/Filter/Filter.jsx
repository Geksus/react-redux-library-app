import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  selectAuthorFilter,
  selectTitleFilter,
  selectOnlyFavorite,
  setAuthorFilter,
  setTitleFilter,
  setOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

export default function Filter() {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite);

  function handleTitleFilterChange(event) {
    if (event) {
      dispatch(setTitleFilter(event.target.value));
    }
  }

  function handleAuthorFilterChange(event) {
    if (event) {
      dispatch(setAuthorFilter(event.target.value));
    }
  }

  function handleOnlyFavoriteFilterChange() {
    dispatch(setOnlyFavoriteFilter());
  }

  function handleResetFilters() {
    dispatch(resetFilters());
  }

  return (
    <div className="app-block filter">
      <h2>Filters</h2>
      <div className="filter-group">
        <input
          type="text"
          placeholder="Filter by title..."
          style={{ margin: "5px" }}
          value={titleFilter}
          onChange={handleTitleFilterChange}
        />
        <input
          type="text"
          placeholder="Filter by author..."
          style={{ margin: "5px" }}
          value={authorFilter}
          onChange={handleAuthorFilterChange}
        />
        <div className="row" style={{ margin: "5px" }}>
          <span>Only favorite </span>
          <input
            type="checkbox"
            onChange={handleOnlyFavoriteFilterChange}
            checked={onlyFavoriteFilter}
          />
        </div>
        <div className="row" style={{ margin: "5px" }}>
          <button type="button" onClick={handleResetFilters}>
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
}
