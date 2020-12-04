import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookService";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    BookDataService.getAll()
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBooks();
    setCurrentBook(null);
    setCurrentIndex(-1);
  };

  const setActiveBook = (book, index) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  };

  const removeAllBooks = () => {
    BookDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = [
    { dataField: "id", hidden: true },
    {
      dataField: "title",
      text: "Book Title",
      sort: true,
    },
    {
      dataField: "author",
      text: "Author",
      sort: true,
    },
  ];

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${row.data}`);
      setActiveBook(row, rowIndex);
    },
  };

  const borderStyle = {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
  };

  const { SearchBar } = Search;

  return (
    <div>
      <Home />
      <div className="jumbotron">
        <h2 className="text-info text-center">Add, remove, update books.</h2>
        <hr />
        <div className="row">
          <div className="col-md-6"></div>
          <div className="row">
            <div className="col-md-6">
              <h4>The library's books</h4>
              <ToolkitProvider
                keyField="id"
                data={books}
                columns={columns}
                search
              >
                {(props) => (
                  <div>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <BootstrapTable
                      {...props.baseProps}
                      className="bg-white"
                      keyField="id"
                      rowEvents={tableRowEvents}
                      striped
                      hover
                      condensed
                    />
                  </div>
                )}
              </ToolkitProvider>
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={removeAllBooks}
              >
                Remove All
              </button>
            </div>
            <div className="col-md-6">
              {currentBook ? (
                <div
                  className="bg-white border border-info"
                  style={borderStyle}
                >
                  <h4>Book</h4>
                  <hr />
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentBook.title}
                  </div>
                  <div>
                    <label>
                      <strong>Author:</strong>
                    </label>{" "}
                    {currentBook.author}
                  </div>
                  <div>
                    <label>
                      <strong>Rating:</strong>
                    </label>{" "}
                    {currentBook.rating}
                  </div>
                  <div>
                    <label>
                      <strong>Pages:</strong>
                    </label>{" "}
                    {currentBook.pages}
                  </div>
                  <div>
                    <label>
                      <strong>Language:</strong>
                    </label>{" "}
                    {currentBook.language}
                  </div>
                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentBook.description}
                  </div>
                  <div>
                    <label>
                      <strong>Publisher:</strong>
                    </label>{" "}
                    {currentBook.publisher}
                  </div>
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>{" "}
                    {currentBook.published ? "Published" : "Pending"}
                  </div>

                  <Link
                    to={"/books/" + currentBook.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Book...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksList;
