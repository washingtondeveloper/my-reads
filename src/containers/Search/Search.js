import React from 'react';
import { Link } from 'react-router-dom';

import BookList from '../../components/BookList/BookList';

/**
 * @description Responsavel em pesquisar livros, para adicionar na estante
 */
export default class Search extends React.Component {

    componentDidMount() {
        this.props.onCleanBooks();
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={event => {
                            const { value } = event.target;
                            this.props.onChangeSearch(value)
                        }
                        } />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <BookList
                            listBooks={this.props.listBooks}
                            onChangeBook={this.props.onChangeBook} />
                    </ol>
                </div>
            </div>
        )
    }
}