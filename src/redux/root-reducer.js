//va a ser lo que combina todos los states, que luego se rompen en secciones individuales
import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

//las keys son los reducers para cada parte y con el combine reducers vamos a generar
//todo el state es un objeto gigante, el combine reducers va a juntar todos los states generados por los reducers
export default combineReducers({
    user: userReducer,
    cart: cartReducer,
});
