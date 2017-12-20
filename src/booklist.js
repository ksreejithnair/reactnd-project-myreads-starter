import React,{ Component } from 'react'
import BookShelf from './bookshelf'

class BookList extends Component {


	render() {
		const {books,moveBook} = this.props;
		return <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={books} moveBook={moveBook}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
        </div>
	}
}

export default BookList;
