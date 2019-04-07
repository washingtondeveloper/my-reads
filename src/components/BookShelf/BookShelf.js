import React from 'react';

import BookList from '../BookList/BookList';

/**
 * @description Responsavel em organizar a Shelf
 * @param listBooks Lista de Books
 * @param title Titulo da estante
 */
class BookShelf extends React.Component {
	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<BookList listBooks={this.props.listBooks} onChangeBook={this.props.onChangeBook} />
				</div>
			</div>
		);
	}
}

export default BookShelf;
