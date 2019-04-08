import reducer from './searchReducer';
import * as types from '../../actions/types';

describe('SearchReducer', () => {
	it('should return default state', () => {
		const initialState = { books: [] };
		expect(reducer(undefined, { type: undefined })).toEqual(initialState);
	});

	it('should return cleanBooksSearch', () => {
		const initialState = { books: [] };
		expect(reducer(undefined, { type: types.CLEAN_BOOKS_SEARCH })).toEqual(initialState);
	});

	it('should return new books', () => {
		expect(reducer(undefined, { type: types.ADD_ALL_BOOKS, payload: [ 'teste' ] })).toEqual({ books: [ 'teste' ] });
	});

	it('should return books updated', () => {
		const state = {
			books: [ { id: 1, name: 'teste1' }, { id: 2, name: 'teste2' } ]
		};

		const action = {
			type: 'UPDATE_BOOK_SEARCH',
			payload: { id: 2, name: 'changeTeste' }
		};

		const expectedState = {
			books: [ { id: 1, name: 'teste1' }, { id: 2, name: 'changeTeste' } ]
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});
});
