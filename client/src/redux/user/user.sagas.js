import { put, all, call } from '@redux-saga/core/effects';
import { takeLatest } from 'redux-saga/effects';

import { provider, auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user.actions';

// vamos a escuchar al start del sign in

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const user = userAuth;
        const userRef = yield call(createUserProfileDocument, user);
        console.log(userRef);
        const userSnapShot = yield userRef.get();

        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        // es yield porque queremos el valor del sign in
        const { user } = yield auth.signInWithPopup(provider);
        // se le pasa el provider, asi debe de ser con firebase
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);

        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SING_IN_START, signInWithEmail);
}

export function* isUserAthenticated() {
    try {
        // no hay forma en promesa de saber si esta autenticadp
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        // como nos va a regresar el auth
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure());
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAthenticated);
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart)]);
}
