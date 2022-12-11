import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Bookshelves from "./components/Bookshelves";
import { getAll } from "./BooksAPI";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  /* STATE AND VARIABLES */
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  /** Dividing books into three categories in order to distribute them among shelves   **/
  let readBooks, currentlyReadingBooks, wantToReadBooks;

  /* USE EFFECTS */
  useEffect(() => {
    /* This function retrieves all books via the bookAPI and saves them inside the state variable <books> */
    const getBooks = async () => {
      setIsLoading(true);
      let newBooks = await getAll();
      setBooks((prevState) => [...prevState, ...newBooks]);
      setIsLoading(false);
    };

    getBooks();
  }, []);

  useEffect(() => {
    /* populating variables in order to distribute them among shelves when retrieved books change */
    readBooks = books.filter((book) => book.shelf === "read");
    wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
    currentlyReadingBooks = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
  }, [books]);

  /* RETURNS */
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  /* Initial values for book shelves*/
  readBooks = books.filter((book) => book.shelf === "read");
  wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
  currentlyReadingBooks = books.filter(
    (book) => book.shelf === "currentlyReading"
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Bookshelves
              setIsLoading={setIsLoading}
              setBooks={setBooks}
              books={books}
              readBooks={readBooks}
              wantToReadBooks={wantToReadBooks}
              currentlyReadingBooks={currentlyReadingBooks}
            />
          }
        ></Route>
        <Route
          path="/search"
          element={<Search setBooks={setBooks} books={books}></Search>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
