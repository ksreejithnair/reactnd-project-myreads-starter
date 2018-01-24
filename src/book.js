import React,{ Component } from 'react'
import PropTypes from 'prop-types'

/**
 * @description - This component builds the html to display a book.
 */
class Book extends Component {

  render(){
    const {book,moveBook,bookIndex} = this.props;

    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks&&book.imageLinks.thumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select value={book.shelf?book.shelf:'none'} onChange={(event)=>moveBook(event,book,bookIndex)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && book.authors.map((author)=>(
      <div className="book-authors" key={author}>
        {author}
     </div>
      ))}
    </div>
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired,
  bookIndex: PropTypes.number.isRequired
}

export default Book;