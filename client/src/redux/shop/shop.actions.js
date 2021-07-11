import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

// el thunk nos deja hacer funciones que mandan funciones al reducer desde una sola
// la forma en que el thunk sabe cuál ignorar es por que el return es una función
export const fetchCollectionStartAsync = () => {
    // importante pasar el dispatch
    return (dispatch) => {
        const collectionRef = firestore.collection('collections');
        // esto se puede gracias a redux-thunk
        dispatch(fetchCollectionsStart());

        collectionRef
            .get()
            .then((snapshot) => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

                // despacha esto al reducer que ve quepedo
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch((err) => dispatch(fetchCollectionsFailure(err)));
    };
};
