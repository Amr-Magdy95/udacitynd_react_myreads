import React, { useEffect, useState } from "react";
import { search } from "../BooksAPI";
import Book from "./Book";

function Search({ toggleSearch, setBooks,books }) {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setResults([]);
    const getSearchBooks = async () => {
      let searchBooks = await search(...searchTerm.toLowerCase().split(' '), 20);
      try {
        if (searchBooks.error === "empty query" || !searchBooks) {
          throw new Error("empty query");
        } else {
          for(let i = 0 ; i < searchBooks.length; i++){
            searchBooks[i].shelf = "none";
            for(let j = 0; j < books.length; j++){
              if(searchBooks[i].title === books[j].title){
                searchBooks[i].shelf = books[j].shelf;
              }
            }
          }
          setResults(searchBooks);
        }
      } catch (err) {}
    };
    getSearchBooks();
  }, [searchTerm]);

  
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => toggleSearch()}>
          Close
        </a>
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
        <ol className="books-grid">
          {!results.length
            ? "Loading..."
            : results.map((book) => <Book key={book.id} {...book} setBooks={setBooks}></Book>)}
        </ol>
      </div>
    </div>
  );
}

export default Search;