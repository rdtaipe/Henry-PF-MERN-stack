import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './reducer.js';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

