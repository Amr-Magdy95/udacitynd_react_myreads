import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Bookshelves from "./components/Bookshelves";
import {  getAll } from "./BooksAPI";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
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

  /* RETURNS */

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  readBooks = books.filter((book) => book.shelf === "read");
  wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
  currentlyReadingBooks = books.filter(
    (book) => book.shelf === "currentlyReading"
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bookshelves setIsLoading={setIsLoading} setBooks={setBooks} books={books} readBooks={readBooks} wantToReadBooks={wantToReadBooks} currentlyReadingBooks={currentlyReadingBooks} />}></Route>
        <Route path="/search" element={<Search  setBooks={setBooks} books={books}></Search>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
