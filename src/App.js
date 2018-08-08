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

    /**Inciando o Map */
    this.state.mapShelf.set('Currently Reading', [
      { id:'1', title: 'To Kill a Mockingbird', authors: ['Harper Lee'], imageLinks: { thumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api' } },
      { id:'2', title: "Ender's Game", authors: ['Orson Scott Card'], imageLinks: { thumbnail: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api' } }
    ]);

    this.state.mapShelf.set('Want to Read', [
      { id:'3', title: 'David McCullough', authors: ['Mark Twain'], imageLinks: { thumbnail: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api' } },
      { id:'4', title: "Harry Potter and the Sorcerer's Stone", authors: ['J.K. Rowling'], imageLinks: { thumbnail: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api' } }
    ]);

    this.state.mapShelf.set('Read', [
      { id:'5', title: "The Hobbit", authors: ["J.R.R. Tolkien"], imageLinks: { thumbnail: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api' } },
      { id:'6', title: "Oh, the Places You'll Go!", authors: ["Seuss"], imageLinks: { thumbnail: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api' } },
      { id:'7', title: "The Adventures of Tom Sawyer", authors: ["Mark Twain"], imageLinks: { thumbnail: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api' } }
    ]);

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

  /**
   * @description Responsavel na mudança do select do livro
   * @param {string} event 
   */
  handleChange(event) {
    let id = event.target.id;
    let shelfDesejada = event.target.value;
    
    let shelfActual = [...this.state.mapShelf.keys()].find(key => {
      return [...this.state.mapShelf.get(key)].some(book => book.id === id) ? key : undefined ;
    })

    console.log('Atual', shelfActual);
    console.log('Desejada', shelfDesejada);
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
