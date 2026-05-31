const SearchFilter = (props) => {
  const { onSearch, onFilter } = props;

  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleFilterChange = (e) => {
    if (onFilter) {
      onFilter(e.target.value);
    }
  };

  return (
    <div className="search-filter">
      <div className="search-box">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search masks..."
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-box">
        <label htmlFor="price-filter">Sort by:</label>
        <select id="price-filter" onChange={handleFilterChange} className="filter-select">
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Discount</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
