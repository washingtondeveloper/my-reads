import React from 'react';
import { Link } from 'react-router-dom';

import BookList from '../../components/BookList/BookList';

/**
 * @description Responsavel em pesquisar livros, para adicionar na estante
 */
export default props => (
    <div className="search-books">
        <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={event => { 
                    const { value } = event.target; 
                    props.onChangeSearch(value) }
                    }/>
            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
                <BookList 
                    listBooks={props.listBooks}
                    onChangeBook={props.onChangeBook}/>
            </ol> 
        </div>
    </div>
);