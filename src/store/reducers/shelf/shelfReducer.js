import * as types from '../../actions/types';

const INITIAL_STATE = {
	shelf: {
		// eslint-disable-next-line
		['currentlyReading']: [],
		// eslint-disable-next-line
		['wantToRead']: [],
		// eslint-disable-next-line
		['read']: []
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.CURRENTLY_READING:
			return {
				...state,
				shelf: {
					...state.shelf,
					currentlyReading: [ ...state.shelf['currentlyReading'], action.payload ]
				}
			};
		case types.WANT_TO_READ:
			return {
				...state,
				shelf: {
					...state.shelf,
					wantToRead: [ ...state.shelf['wantToRead'], action.payload ]
				}
			};
		case types.READ:
			return {
				...state,
				shelf: {
					...state.shelf,
					read: [ ...state.shelf['read'], action.payload ]
				}
			};
		case types.ADD_LIST:
			return {
				...state,
				shelf: {
					...state.shelf,
					[action.payload.typeMethod]: action.payload.list
				}
			};
		case types.UPDATE_SHELF:
			return {
				...state,
				shelf: action.payload
			};
		case types.CLEAN_SHELF:
			return INITIAL_STATE;
		default:
			return state;
	}
};
