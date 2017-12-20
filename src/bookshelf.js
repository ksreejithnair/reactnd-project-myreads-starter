import React, { Component } from 'react'
import Book from './book'

class BookShelf extends Component {


	render(){
		const {books,moveBook} = this.props;
		//TODO: Not sure how to render this with one iteration of array.
		//
		let currentBookShelf,preBookShelf,bookShelfHead, bookShelfBody, bookShelfTail,out = '';
		return <div>
			{books.map((book)=> {
				//I need to display bookshelf peice only if book.shelf !== prevBookShelf
				//I am not able to break this into peices and combine later.
				bookShelfHead = (<div className="bookshelf" key={book.id}>
	          <h2 className="bookshelf-title">{book.shelf}</h2>
	          <div className="bookshelf-books">
	            <ol className="books-grid">
								<li>
	              	<Book book={book} moveBook={moveBook}/>
	              </li>
							</ol>
	          </div>
	        </div>);
				out = <div>SREE</div>;
				return [out,bookShelfHead];
			})}
    </div>
	}
}

export default BookShelf;