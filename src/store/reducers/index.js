import { combineReducers } from 'redux';

import searchReducer from './search/searchReducer';
import shelfReducer from './shelf/shelfReducer';

export default combineReducers({
	books: searchReducer,
	mapShelf: shelfReducer
});
