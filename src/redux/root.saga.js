// De acá se van a correr todas las sagas de los distintos concearns
import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSaga } from './user/user.sagas';
import { cartSaga } from './cart/cart.sagas';

export default function* rootSaga() {
    // recibe un array con las sagas que se van a correr llamadas, las corre de forma concurrente
    yield all([call(fetchCollectionsStart), call(userSaga), call(cartSaga)]);
}
