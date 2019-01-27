import { combineReducers } from 'redux'

import bookReducer from './book/bookReducer'

export default combineReducers({
    book: bookReducer
})