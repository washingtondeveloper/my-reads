import React from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './services/BooksAPI'

import Search from './containers/Search/Search';
import Shelf from './containers/Shelf/Shelf';

import './styles/App.css';

/**
 * @description Todo o estado vai ficar nessa classe, 'single source of thruth'
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapShelf: new Map(),
      listBooks: [] // Lista de livros da pesquisa
    }

    /**
     * @description Esse Map foi criado para auxilar o tipo de pratileira,
     * a chave do desse Map e o value do select, e seu valor é a Chave do outro Map
     * para podermos organizar a pratileira.
     */
    this.mapTypeShelf = new Map();
    this.mapTypeShelf.set('currentlyReading', 'Currently Reading');
    this.mapTypeShelf.set('wantToRead', 'Want to Read');
    this.mapTypeShelf.set('read', 'Read');

    /**
     * @description Map de pratileira
     */
    this.state.mapShelf.set('Currently Reading', []);
    this.state.mapShelf.set('Want to Read', []);
    this.state.mapShelf.set('Read', []);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cleanListBooks = this.cleanListBooks.bind(this);
  }

  /**
   * @description Quando a lista chega, preciso verificar
   * se o livro que vem na pesquisa já esta na minha prateleira,
   * esse metodo resolve esse problema para mim.
   * 
   * Adicionando mais um atributo na lista da pesquisa.
   * O atributo 'shelf'
   * 
   * @param {Array} listWillModificada 
   * @param {Array} arrayLista - de Lista, para mais detalhes
   * na posição [0] tem uma lista [1] tem uma lista e na posição [2]; 
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
  handleSearch(query) {
    
    if (query) {
      BooksAPI.search(query)
        .then(searchBooks => {
          const { error } = searchBooks;
          if(error) {
            console.error(error);
            this.cleanListBooks();
            return;
          }

          this.addPropertyBook(searchBooks, [ ...this.state.mapShelf.values()]);

          this.setState({ listBooks: searchBooks })
        });
    }else {
      this.cleanListBooks();
    }
  }

  cleanListBooks() {
    this.setState(state => ({ ...state, listBooks: [] }));
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
    const id = event.target.id;
    const shelfDesejada = event.target.value;
    const listOfKeys = [...this.state.mapShelf.keys()];
    
    let shelfActual = listOfKeys.find(key => {
      return [...this.state.mapShelf.get(key)].some(book => book.id === id) ? key : undefined ;
    });

    if(shelfDesejada === 'none') {
      this.removeShelf({ shelfActual, shelfDesejada, id });
      return;
    }


    if(shelfActual) {
      this.setShelfDesejada({ shelfActual, shelfDesejada, id });

      this.removeShelf({ shelfActual, shelfDesejada, id});
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

  setShelfDesejada(shelf) {

    const { id, shelfActual, shelfDesejada } = shelf;

    this.setState(state => {
      const bookFound = state.mapShelf.get(shelfActual).find(b => b.id === id);
      bookFound.shelf = shelfDesejada;
      BooksAPI.update(bookFound, shelfDesejada);
      return {
        ...state, 
        mapShelf: state.mapShelf.set(this.mapTypeShelf.get(shelfDesejada), [...state.mapShelf.get(this.mapTypeShelf.get(shelfDesejada)), bookFound]) 
      };
    });
  }

  removeShelf(shelf) {
    const { id, shelfActual, shelfDesejada } = shelf;

    this.setState(state => {
      let list = state.mapShelf.get(shelfActual);
      let newList = list.filter(book => book.id !== id);

      if(shelfDesejada === 'none') {
        const book = list.find(bk => bk.id === id);
        BooksAPI.update(book, shelfDesejada);
      }

      return {
        ...state, 
        mapShelf: state.mapShelf.set(shelf.shelfActual, newList) 
      };
    });
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
            onCleanBooks={this.cleanListBooks}
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
