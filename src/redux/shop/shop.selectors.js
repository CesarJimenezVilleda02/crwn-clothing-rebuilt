import { createSelector } from 'reselect';

//usamos este objeto porque el parametro del url es una cadena y queremos que corresponda al numero de
//colleccion
const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector([selectShop], (shop) => shop.collections);

//hay que encontrar el id que hace match con el collectionidmap
export const selectCollection = (collectionUrlParam) =>
    createSelector([selectCollections], (collections) =>
        // nos va a regresar el elemento que de true
        collections.find((collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    );
//aqui pasa el currying que es una funcion que regresa otra funcion
