import React, { Component } from 'react'
import Book from './book'
import PropTypes from 'prop-types'

/**
 * @Description - This component produces multiple bookshelf based on data.
 * 								This is scalable, even if API adds a new shelf, without any code change it will create new shelf
 *
 */
class BookShelf extends Component {

	render(){
		const {books,moveBook,pushToHashMap} = this.props;

		let booksArr = [];
		let bookShelfArr = [];

			for(let i=0;i<books.length; i++){
				let book=books[i];
				//Assuming shelf is always camelCase.
				let bookShelfTitle = book.shelf.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
				booksArr.push(<li key={i}><Book book={book} moveBook={moveBook} bookIndex={i}/></li>);
				//I need to display bookshelf peice only if book.shelf !== prevBookShelf
				//I am not able to break this into peices and combine later.
				if((books[i+1] && book.shelf !== books[i+1].shelf) || i===books.length-1){
					bookShelfArr.push(<div className="bookshelf" key={book.id}>
	          <h2 className="bookshelf-title">{bookShelfTitle}</h2>
	          <div className="bookshelf-books">
	            <ol className="books-grid">
									{booksArr}
								</ol>
		          </div>
		        </div>);
					booksArr = [];
				}


			}
return <div>{bookShelfArr}</div>;
	}
}

BookShelf.propTypes = {
	books: PropTypes.array.isRequired,
	moveBook: PropTypes.func.isRequired,
	pushToHashMap: PropTypes.func
}

export default BookShelf;