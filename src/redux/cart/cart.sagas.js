import { all, takeLatest, put } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';

import { clearCart } from './cart.actions';

export function* clearOnSignOut() {
    yield put(clearCart());
}

// va a escuchar las acciones que crea el user
export function* onSignOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearOnSignOut);
}

export function* cartSaga() {
    yield all([onSignOut()]);
}
