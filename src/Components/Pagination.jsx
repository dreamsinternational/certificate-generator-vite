const Pagination = ({ totalPages = 1, currentPage = 1, setCurrentPage }) => {
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 10;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (totalPages <= maxPageNumbers) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.floor(maxPageNumbers / 2)) {
      endPage = maxPageNumbers;
    } else if (currentPage + Math.floor(maxPageNumbers / 2) >= totalPages) {
      startPage = totalPages - maxPageNumbers + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageClick(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  return (
    <div className="demo">
      <nav className="pagination-outer" aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={handlePreviousClick}
            >
              <span aria-hidden="true">
                <b>«</b>
              </span>
            </button>
          </li>
          {renderPageNumbers()}
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              onClick={handleNextClick}
            >
              <span aria-hidden="true">
                <b>»</b>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
