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
      query: '',
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
   * @description Quando a lista chega, preciso verificar
   * se o livro que vem na pesquisa já esta na minha prateleira,
   * esse metodo resolve esse problema para mim.
   * 
   * @param {Array} listWillModificada 
   * @param {Array} arrayLista - de Lista; 
   */
  addPropertyBook(listWillModificada, arrayLista) {
    
    for(let i = 0; i < arrayLista.length; i++) {
      
      listWillModificada.map(searBook => {
        const bookFound = arrayLista[i].find(bk => bk.id === searBook.id);
        if(bookFound) {
          searBook['shelf'] = bookFound['shelf'];
          return searBook;
        }
        return searBook;
      });

    }

  }

  /**
   * @description Responsavel em pesquisar os Livros
   * @param {string} event 
   */
  handleSearch(value) {
    this.setState(state => ({...state, query: value}))
    const query = value;
    if (query) {
      BooksAPI.search(query)
        .then(searchBooks => {

          this.addPropertyBook(searchBooks, [ ...this.state.mapShelf.values()]);

          this.setState({ listBooks: searchBooks })
        });
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        books.forEach(book => {
          /**
           * Monta minha lista na tela principal
           * com as três pratileiras:
           * 1) Currently Reading
           * 2) Want to Read
           * 3) Read
           */
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
            resultBook['shelf'] = shelfDesejada;
            BooksAPI.update(resultBook, shelfDesejada);
            return { 
              ...state, 
              mapShelf: state.mapShelf.set( this.mapTypeShelf.get(shelfDesejada), [...state.mapShelf.get( this.mapTypeShelf.get(shelfDesejada)), resultBook]),
              listBooks: state.listBooks.map(book => {
                if(book.id === id) {
                  console.log('Encontrou')
                  book['shelf'] = shelfDesejada;
                  return book;
                }
                return book;
              })
            };
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
