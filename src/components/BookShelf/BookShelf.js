import React from 'react';

import BookList from '../BookList/BookList';

/**
 * @description Responsavel em organizar a Shelf
 * @param listBooks Lista de Books
 * @param title Titulo da estante
 */
export default props => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
            <BookList listBooks={props.listBooks} onChangeBook={props.onChangeBook}/>
        </div>
    </div>
);