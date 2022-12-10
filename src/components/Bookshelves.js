import React from 'react'
import Bookshelf from "./Bookshelf";
import {Link} from 'react-router-dom';


function Bookshelves({books, currentlyReadingBooks, readBooks, wantToReadBooks, setIsLoading, setBooks}) {
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
          <Link to="/search" style={{ cursor: "pointer" }}>
            Add a book
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Bookshelves