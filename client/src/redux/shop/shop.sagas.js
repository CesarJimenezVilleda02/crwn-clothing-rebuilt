// queremos mover lo del thunk a sagas
// los effects nos dejan hacer distintas cosas con las sagas

// el proposito del middleware es correr todas las sagas al mismo tiempo sin pausar
// la ejecución y poder bloquear cuando algo está pasando si llega la misma accion nuevamente
// para eso son los yields, le dan el control al middleware para cancelar las tasks en esos puntos

// escuha todas las acciones de este tipo -- call es el efecto que invoca un método
import { takeEvery, call, put, takeLatest } from '@redux-saga/core/effects';
// put es el effecto que hace y manda acciones
import actionTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// todas las funciones generador deben tener un yield
export function* fetchCollectionsAsync() {
    // yield console.log('I am fired');
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        //en vez de tener que usar el then, la resolución el yield es como el await y le da el valor al snapshot

        // efecto que invoca funciones que podrían tardra, entra la función y luego argumentos
        // todo esto lo hacemos para seguir poniendo puntos donde parar el desmadre
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        yield put(fetchCollectionsSuccess(collectionsMap));
        // para errores vamos a usar lo mismo que en async, un try catch
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    // va a pausar cuando una accion llega
    // cuando llega el tipo start, hace lo del fetchCollectionAsync
    yield takeLatest(actionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
    // crea un llamada que no bloque la app, no pausa el javascript que esta en el async
}
