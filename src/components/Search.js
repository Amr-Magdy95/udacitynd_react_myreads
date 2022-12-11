import React, { useEffect, useState } from "react";
import { search } from "../BooksAPI";
import Book from "./Book";
import {Link} from 'react-router-dom';

function Search({  setBooks,books }) {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if(searchTerm.length === 0) setResults([]);
    setResults([]);
    const getSearchBooks = async () => {
      let searchBooks = await search(...searchTerm.toLowerCase().split(' '), 20);
      try {
        if (searchBooks.error === "empty query" || !searchBooks) {
          throw new Error("empty query");
        } else {
          for(let i = 0 ; i < searchBooks.length; i++){
            searchBooks[i].shelf = "noValue";
            for(let j = 0; j < books.length; j++){
              if(searchBooks[i].id === books[j].id){
                searchBooks[i].shelf = books[j].shelf;
              }
            }
          }
          setResults(searchBooks);
        }
      } catch (err) {}
    };
    getSearchBooks();
  }, [searchTerm, books]);

  
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
          {results.length <=0 && <h2>No search results to show</h2>}
        <ol className="books-grid">
          {results && results.map((book) => <Book key={book.id} {...book} setBooks={setBooks}></Book>)}
        </ol>
      </div>
    </div>
  );
}

export default Search;
