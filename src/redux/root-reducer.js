//va a ser lo que combina todos los states, que luego se rompen en secciones individuales
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //con esto sacamos el local storage
// import sessionstorage from 'redux-persist/lib/storage'; //estos folders no son los reales, son representacion
//con esto sacamos el session

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

//esto solo será el json con la configuracion de lo que vamos a querer hacer con el persist
const persistConfig = {
    //a partir de donde queremos guardar las cosas
    key: 'root',
    storage,
    //aqui van a ir los nombres en caracter de lo queremos guardar
    whitelist: ['cart'], //no hay razón para persistir el user, ese ya lo maneja el auth
};

//las keys son los reducers para cada parte y con el combine reducers vamos a generar
//todo el state es un objeto gigante, el combine reducers va a juntar todos los states generados por los reducers
// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer,
// });

//USANDO EL PERSIST

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
});

//esto va a dar el root modificado con la configuracion, es el root pero con el local storage linkeado
export default persistReducer(persistConfig, rootReducer);
