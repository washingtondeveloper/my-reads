import React from 'react'

import { Route } from 'react-router-dom';

// import * as BooksAPI from './BooksAPI'
import Search from './containers/Search/Search';
import Shelf from './containers/Shelf/Shelf';

import './styles/App.css'

/**
 * @description Todo o stado vai ficar nessa classe, tentando aproveitar a maioria dos componentes
 */
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(status) {
    this.setState({ showSearchPage: status })

    console.log(this.state);  
  }

  render() {
    return(
      <div className="app">
        <Route exact path="/" render={() => {
          <Shelf onChangeStatus={this.handleChange}/>
        }}/>
        <Route path='/search' render={() => {
          <Search onChangeStatus={this.handleChange} />
        }} />
      </div>
    );
  }
}

export default App;
