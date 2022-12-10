import React, { useRef } from "react";
import { TiTick } from "react-icons/ti";
import {getAll, update, get} from '../BooksAPI';

function Book({ imageLinks, title, authors, shelf, id, setBooks }) {
  const selectForm = useRef(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newShelf = e.target.value;
    const newValue = await get(id);    
    newValue.shelf=newShelf;
    await update(id, newShelf);
    setBooks(oldBooks=>{
      const newResult = oldBooks.filter(book => book.id !== id);
      return [...newResult, newValue]
    })   
    
  }
  const image = !imageLinks? "": (`url(${imageLinks.thumbnail})` );
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `${image}`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <form ref={selectForm} >
              <select value={shelf} onChange={ (e)=>handleSubmit(e)}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </form>
          </div>
        </div>
        <div className="book-title">{title} </div>
        <div className="book-authors">
          {authors && authors.map((author) => `${author}, `)}
        </div>
      </div>
    </li>
  );
}




export default Book;
