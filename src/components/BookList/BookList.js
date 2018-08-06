import React from 'react';

import Book from '../Book/Book';

/**
 * @description Responsavel em listar os Livros
 * @param listBooks Lista de livros
 * @type Array
 */
export default props => (
    <ol className="books-grid">
        {props.listBooks.map((modelBook, i) => {
            console.log(modelBook);
            return <Book key={i} title={modelBook.title} authors={modelBook.authors} imageLinks={modelBook.imageLinks} />
        } )}
    </ol>
);