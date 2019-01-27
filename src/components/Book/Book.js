import React from 'react';
/**
 * @description Responsavel em representar um livro
 * @param title Titulo do livro
 * @param authors Autores do livro
 */
export default props => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.imageLinks ? props.imageLinks.thumbnail : ''})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={props.onChangeBook} id={props.id} value={props.bookSelected ? props.bookSelected : 'none'}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.title}</div>
            {props.authors && 
                <div className="book-authors">{props.authors.reduce((textFinal, author) => `${textFinal}, ${author}`)}</div>
            }
        </div>
    </li>
);