import React from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './services/BooksAPI'

import Search from './containers/Search/Search';
import Shelf from './containers/Shelf/Shelf';

import './styles/App.css';

/**
 * @description Todo o stado vai ficar nessa classe, tentando aproveitar a maioria dos componentes
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapShelf: new Map(),
      listBooks: []
    }

    this.mapTypeShelf = new Map();
    this.mapTypeShelf.set('currentlyReading', 'Currently Reading');
    this.mapTypeShelf.set('wantToRead', 'Want to Read');
    this.mapTypeShelf.set('read', 'Read');

    /**Inciando o Map */
    this.state.mapShelf.set('Currently Reading', []);

    this.state.mapShelf.set('Want to Read', []);

    this.state.mapShelf.set('Read', []);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @description Responsavel em pesquisar os Livros
   * @param {string} event 
   */
  handleSearch(event) {
    let query = event.target.value;
    if (query) {
      BooksAPI.search(query)
        .then(result => {
          this.setState({ listBooks: result })
        });
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        books.forEach(book => {
          switch(book.shelf) {
            case "currentlyReading":
              this.setState(state => {
                return state.mapShelf.set('Currently Reading', [...state.mapShelf.get('Currently Reading'), book])
              })
              break;
            case "wantToRead":
              this.setState(state => {
                return state.mapShelf.set('Want to Read', [...state.mapShelf.get('Want to Read'), book])
              })
              break;
            case "read":
              this.setState(state => {
                return state.mapShelf.set('Read', [...state.mapShelf.get('Read'), book])
              })
              break;
            default:
              break;
          } 
        })
      });
  }

  /**
   * @description Responsavel na mudança do select do livro
   * @param {object} event 
   */
  handleChange(event) {
    let id = event.target.id;
    let shelfDesejada = event.target.value;
    
    let shelfActual = [...this.state.mapShelf.keys()].find(key => {
      return [...this.state.mapShelf.get(key)].some(book => book.id === id) ? key : undefined ;
    })

    if(shelfActual) {
      /** Setar na desejada */
      this.setState(state => {
        const bookFound = state.mapShelf.get(shelfActual).find(b => b.id === id);
        bookFound.shelf = shelfDesejada;
        BooksAPI.update(bookFound, shelfDesejada);
        return state.mapShelf.set(this.mapTypeShelf.get(shelfDesejada), [...state.mapShelf.get(this.mapTypeShelf.get(shelfDesejada)), bookFound]);
      });

      /**Remove da Atual */
      this.setState(state => {
        let list = state.mapShelf.get(shelfActual);
        let newList = list.filter(book => book.id !== id);
        return state.mapShelf.set(shelfActual, newList);
      });
    } else {
      BooksAPI.get(id)
        .then(resultBook => {
          this.setState(state => {
            BooksAPI.update(resultBook, shelfDesejada)
              .then(() => {
                return state.mapShelf.set( this.mapTypeShelf.get(shelfDesejada), [...state.mapShelf.get( this.mapTypeShelf.get(shelfDesejada)), resultBook]);
              })
          })
        })
    }



  }

  render() {
    return (
      <div className="app">
        
        <Route exact path="/" render={() => (
          <Shelf 
            myMapShelf={this.state.mapShelf}
            onChangeBook={this.handleChange}
            />
        )} />

        <Route path="/search" render={() => (
          <Search
            onChangeSearch={this.handleSearch}
            listBooks={this.state.listBooks}
            onChangeBook={this.handleChange}
          />
        )} />
      </div>
    );
  }
}

export default App;
