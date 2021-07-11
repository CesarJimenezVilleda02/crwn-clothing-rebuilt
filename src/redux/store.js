import { createStore, applyMiddleware } from 'redux';
//le ponemos el middleware al store para atrapar las acciones de la store y poder verlas
import { persistStore } from 'redux-persist'; //importamos la funcion que permite guardar sesion
//asi podemos cachear el state

// para usar thunk lo importamos y lo metemos en el arrego de middlewares
import thunk from 'redux-thunk';

import logger from 'redux-logger';

import rootReducer from './root-reducer';

// shagas
import createSagaMiddleware from '@redux-saga/core';

// importamos la saga que queremos usar
import { fetchCollectionsStart } from './shop/shop.sagas';
import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware(); //aqui van unas opciones qu eno vamos a ocupar

// reemplazamos saga por thunk porque lo vamos a usar
const middlewares = [logger, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

// adentro del run pasamos las sags
sagaMiddleware.run(rootSaga);

// lo que hacemos con sagss es ponerlas en los mismos folders que sus concearns
