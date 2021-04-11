import { createStore, applyMiddleware } from 'redux';
//le ponemos el middleware al store para atrapar las acciones de la store y poder verlas
import { persistStore } from 'redux-persist'; //importamos la funcion que permite guardar sesion
//asi podemos cachear el state

import logger from 'redux-logger';

import rootReducer from './root-reducer';

// espera un arreglo con todos los middlewares que podamos ocupar
const middlewares = [logger];

//para crear la store se necesita un root reducer y una funcion con los middlewares
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// const stoer = createStore(rootReducer, applyMiddleware(logger)) //es lo mismo

//esta es la versión persistente que va a tener nuestra app, este será el nuevo provider
export const persistor = persistStore(store);

// export default { store, persistore };

// import { createStore, applyMiddleware } from 'redux';
// import { persistStore } from 'redux-persist';
// import logger from 'redux-logger';

// import rootReducer from './root-reducer';

// const middlewares = [logger];

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// export const persistor = persistStore(store);
