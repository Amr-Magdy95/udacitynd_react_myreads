import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Bookshelf from "./components/Bookshelf";
import { get, getAll, update, search } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  let readBooks, currentlyReadingBooks, wantToReadBooks;

  /* USE EFFECTS */
  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      let newBooks = await getAll();
      setBooks((prevState) => [...prevState, ...newBooks]);
      setIsLoading(false);
    };
    getBooks();
  }, []);

  useEffect(() => {
    readBooks = books.filter((book) => book.shelf === "read");
    wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
    currentlyReadingBooks = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
  }, [books]);

  /* FUNCTIONS */

  /*
   **@name -- toggleSearch
   **@param-- None
   **@returns None
   */
  const toggleSearch = () => {
    setShowSearchpage(!showSearchPage);
  };

  /* RETURNS */

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (showSearchPage) {
    return <Search toggleSearch={toggleSearch} setBooks={setBooks} books={books}></Search>;
  }
  readBooks = books.filter((book) => book.shelf === "read");
  wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
  currentlyReadingBooks = books.filter(
    (book) => book.shelf === "currentlyReading"
  );

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {books && (
            <div>
              <Bookshelf
                title={"Currently Reading"}
                books={currentlyReadingBooks}
                setBooks={setBooks}
                setIsLoading={setIsLoading}
              ></Bookshelf>
              <Bookshelf
                title={"Want to Read"}
                books={wantToReadBooks}
                setBooks={setBooks}
                setIsLoading={setIsLoading}
              ></Bookshelf>
              <Bookshelf
                title={"Read"}
                books={readBooks}
                setBooks={setBooks}
                setIsLoading={setIsLoading}
              ></Bookshelf>
            </div>
          )}
        </div>
        <div className="open-search">
          <a onClick={() => toggleSearch()} style={{ cursor: "pointer" }}>
            Add a book
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
