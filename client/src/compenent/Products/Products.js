import React, { useState } from "react";
import Cards from "../cards/Cards";
import "./products.css";
import { useSelector } from "react-redux";

function Products() {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen); // Get sidebar state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const products = useSelector((state) => state.productReducer.products);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle pagination actions
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div
        id="products"
        className={`products ${!isSidebarOpen ? "productsOpen" : ""}`}
      >
        {
          <div className="cards">
            {currentProducts.map((el, _index) => (
              <Cards el={el} key={el._id} />
            ))}
          </div>
        }
      </div>
        <div className="pagination">
          <button
            className="btnPrvs"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/ios/25/FFFFFF/left2.png"
              alt="left2"
            />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={`btnpagt ${currentPage === index + 1 ? "active" : ""}`}
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btnNext"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/ios/25/FFFFFF/right2.png"
              alt="right2"
            />
          </button>
        </div>
    </>
  );
}

export default Products;
