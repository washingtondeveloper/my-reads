import * as API from '../../../services/BooksAPI';
import * as types from '../types';

export const cleanListBooks = () => ({
	type: types.CLEAN_BOOKS_SEARCH
});

const searchAllBooks = (books) => ({
	type: types.ADD_ALL_BOOKS,
	payload: books
});

const addPropertyBook = (listWillModificada, arrayLista) => {
	for (let i = 0; i < arrayLista.length; i++) {
		listWillModificada.map((searBook) => {
			const bookFound = arrayLista[i].find((bk) => bk.id === searBook.id);
			if (bookFound) {
				searBook['shelf'] = bookFound['shelf'];
				return searBook;
			}
			return searBook;
		});
	}
};

export const updateBookSearch = (book) => ({
	type: 'UPDATE_BOOK_SEARCH',
	payload: book
});

export const searchQuery = (query, listShelf) => {
	return (dispatch) => {
		API.search(query).then((searchBooks) => {
			const { error } = searchBooks;
			if (error) {
				console.error(error);
				cleanListBooks();
				return;
			}

			addPropertyBook(searchBooks, [ ...listShelf ]);
			dispatch(searchAllBooks(searchBooks));
		});
	};
};
