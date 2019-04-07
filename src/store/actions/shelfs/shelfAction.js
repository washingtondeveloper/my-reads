import * as types from '../types';
import * as API from '../../../services/BooksAPI';
import { updateBookSearch } from '../search/searchAction';

export const currentlyReading = (book) => ({
	type: types.CURRENTLY_READING,
	payload: book
});

export const wantToRead = (book) => ({
	type: types.WANT_TO_READ,
	payload: book
});

export const read = (book) => ({
	type: types.READ,
	payload: book
});

export const addList = (typeMethod, list) => ({
	type: types.ADD_LIST,
	payload: {
		typeMethod,
		list
	}
});

export const cleanShelf = () => ({ type: types.CLEAN_SHELF });

export const searchShelf = () => {
	return (dispatch) => {
		API.getAll().then((books) => {
			dispatch(cleanShelf());
			books.forEach((book) => {
				setShelf(book, dispatch);
			});
		});
	};
};

const setShelf = (book, dispatch) => {
	switch (book.shelf) {
		case 'currentlyReading':
			dispatch(currentlyReading(book));
			break;
		case 'wantToRead':
			dispatch(wantToRead(book));
			break;
		case 'read':
			dispatch(read(book));
			break;
		default:
			break;
	}
};

export const searchBook = (id, shelfDesejada) => {
	return (dispatch) => {
		API.get(id).then((resultBook) => {
			resultBook['shelf'] = shelfDesejada;
			dispatch(shelfUpdate(resultBook, shelfDesejada));
			setShelf(resultBook, dispatch);
			dispatch(updateBookSearch(resultBook));
		});
	};
};

// eslint-disable-next-line
const update = (shelf) => ({
	type: types.UPDATE_SHELF,
	payload: shelf
});

export const shelfUpdate = (book, shelf) => {
	return (dispatch) => {
		API.update(book, shelf).then((shelfAPI) => {
			console.log('Update Shelf');
			//dispatch(update(shelfAPI));
		});
	};
};
