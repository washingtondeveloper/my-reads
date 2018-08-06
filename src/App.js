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
      listBooks: []
    }

    this.handleSearch = this.handleSearch.bind(this);

  }

  /**
   * @description Responsavel em pesquisar os Livros
   * @param {string} event 
   */
  handleSearch(event) {
    let query = event.target.value;
    if(query){
      BooksAPI.search(query)
        .then(result => {
          this.setState({ listBooks: result})
        });
    }
  }

  render() {
    return(
      <div className="app">
        <Route exact path="/" render={() => (
          <Shelf  />
        )}/>
        <Route path="/search" render={() => (
          <Search 
            onChangeSearch={this.handleSearch}
            listBooks={this.state.listBooks}
          />
        )}/>
      </div>
    );
  }
}

export default App;
