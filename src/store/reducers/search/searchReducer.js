import * as types from '../../actions/types';
const INITIAL_STATE = {
	books: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.CLEAN_BOOKS_SEARCH:
			return INITIAL_STATE;
		case types.ADD_ALL_BOOKS:
			return {
				...state,
				books: action.payload
			};
		case 'UPDATE_BOOK_SEARCH':
			return {
				...state,
				books: [ ...state.books.map((b) => (b.id === action.payload.id ? action.payload : b)) ]
			};
		default:
			return state;
	}
};
