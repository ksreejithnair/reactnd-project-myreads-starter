import React,{ Component } from 'react'
import BookShelf from './bookshelf'
import PropTypes from 'prop-types'

/**
 * @description - This component creates the outer shell of Bookshelf
 */
class BookList extends Component {
	render() {
		const {books,moveBook,onGeneralRedirect,pushToHashMap} = this.props;
		return <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={books} moveBook={moveBook} pushToHashMap={pushToHashMap}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => onGeneralRedirect('/search')}>Add a book</a>
            </div>
        </div>
	}
}

BookList.propTypes = {
	books: PropTypes.array.isRequired,
	moveBook: PropTypes.func.isRequired,
	onGeneralRedirect: PropTypes.func.isRequired,
	pushToHashMap: PropTypes.func
}

export default BookList;
