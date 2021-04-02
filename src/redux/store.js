import { createStore, applyMiddleware } from 'redux';
//le ponemos el middleware al store para atrapar las acciones de la store y poder verlas

import logger from 'redux-logger';

import rootReducer from './root-reducer';

// espera un arreglo con todos los middlewares que podamos ocupar
const middlewares = [logger];

//para crear la store se necesita un root reducer y una funcion con los middlewares
const store = createStore(rootReducer, applyMiddleware(...middlewares));
// const stoer = createStore(rootReducer, applyMiddleware(logger)) //es lo mismo

export default store;
