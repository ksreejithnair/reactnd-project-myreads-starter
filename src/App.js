import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './booklist'
import {Route} from 'react-router-dom'
import BookSearch from './booksearch'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books:[],
    searchResult:[],
    query: '',
    booksHashMap:{}
  };

  componentDidMount(){
    this.getAllBooks();
  }

  /**
   * @description - This function will call API and get All Books and create a
   *                hash map in state (to get lookup of 1) with book.id as key.
   *                It also sets the result in state
   */
  getAllBooks = (shelf,updatedBook, updatedBookIndex)=>{
    BooksAPI.getAll().then((books)=>{
      let temp = {};
      let obj = [];
      //Not sure this is the best way to create the hash map from array of objects.
      books.map((book)=>{
          temp[book.id]=book;
      })
      this.setState((prevState)=>{
        if(prevState.searchResult && prevState.searchResult.length > 0) {
          prevState.searchResult[updatedBookIndex].shelf = shelf;
          console.log(prevState.searchResult);
        }
        return{'books':books, 'booksHashMap':temp, 'searchResult':prevState.searchResult};
    })
    })
  };

  /**
   * @description - Move the book to specific shelf. Ideally I would expect All API
   *                to follow same data structure. Since this is different I am using
   *                get all book API to keep it consistent.
   * @param {object} event - Browser event when user selecting a shelf (we can pass the value instead)
   * @param {object} book - the book user wanted to move
   * @param {number} bookIndex - Array index of the book he wanted to move (Lookup time 1).
   *                              This is for future purpose if update API fix happen.
   *
   */
  moveBook = (event,book,bookIndex)=>{
    const shelf = event.target.value;

    //Idon't like this, I expect getAllAPI and update API give same response.
    //Since API is not designed properly instead of concatinating I am calling getAll again.
    BooksAPI.update(book,shelf).then((data)=>{
      this.getAllBooks(shelf,book, bookIndex);
    })
  };

  /**
   * @description - This is also for future purpose only. Can be removed too.
   * @param {object} book that needs to be pushed to booksHashMap
   */
  pushToHashMap = (book) =>{
    this.setState((prevState)=>{

    })
  };

  /**
   * @description - Redirects to the path provided.
   */
  generalRedirect = (path,history)=>{
    history.push(path);
  };

  /**
   * @description - This will search the books based on query. And serach results will be updated
   *                in the state.
   * @param {string} query - whatever user typed
   */
  searchBooks = (query) => {
    this.setState({'query':query});

    if(query) { //Don't make call if query is empty
      BooksAPI.search(query).then((books,query)=>{
        this.setState((prevState)=>{
          //console.log(books);
          //Updating the search result books, that is there in the shelf already
          books.length && books.map((book)=>{
            book.shelf = prevState.booksHashMap[book.id] && prevState.booksHashMap[book.id].shelf;
            return book;
          });

          return {'searchResult':books&&books.length?books:[]}
        });
      })
    } else { //query empty means user removed search terms, set result to empty.
      this.setState({'searchResult':[]});
    }
  };

  render() {
    return <div className="app">
        <Route path="/search" render={({history})=>{
          return <BookSearch
            onSearch={(query)=>this.searchBooks(query)}
            onGeneralRedirect={(path)=>this.generalRedirect(path,history)}
            searchResult={this.state.searchResult}
            moveBook={this.moveBook}
        />
        }}/>

        <Route exact path="/" render={({history})=>{
          return <BookList
              books={this.state.books}
              moveBook={this.moveBook}
              onGeneralRedirect={(path)=>this.generalRedirect(path,history)}
              pushToHashMap={(book)=>this.pushToHashMap(book)}
              />
        }}/>
      </div>
  }
}

export default BooksApp
