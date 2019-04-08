import * as types from './types';

describe('types actions', () => {
	describe('Shelfs', () => {
		it('should return READ', () => {
			expect(types.READ).toBe('READ');
		});

		it('should return WANT_TO_READ', () => {
			expect(types.WANT_TO_READ).toBe('WANT_TO_READ');
		});

		it('should return CURRENTLY_READING', () => {
			expect(types.CURRENTLY_READING).toBe('CURRENTLY_READING');
		});

		it('should return ADD_LIST', () => {
			expect(types.ADD_LIST).toBe('ADD_LIST');
		});

		it('should return UPDATE_SHELF', () => {
			expect(types.UPDATE_SHELF).toBe('UPDATE_SHELF');
		});

		it('should return CLEAN_SHELF', () => {
			expect(types.CLEAN_SHELF).toBe('CLEAN_SHELF');
		});
	});

	describe('Search', () => {
		it('should return CLEAN_BOOKS_SEARCH', () => {
			expect(types.CLEAN_BOOKS_SEARCH).toBe('CLEAN_BOOKS_SEARCH');
		});
		it('should return CLEAN_BOOKS_SEARCH', () => {
			expect(types.ADD_ALL_BOOKS).toBe('ADD_ALL_BOOKS');
		});
	});
});
