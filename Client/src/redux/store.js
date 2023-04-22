import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './reducer.js';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;