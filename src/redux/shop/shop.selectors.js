import { createSelector } from 'reselect';

//usamos este objeto porque el parametro del url es una cadena y queremos que corresponda al numero de
//colleccion
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector([selectShop], (shop) => shop.collections);

//en el overview estamos usando un array, hay que regresarlo como un arreglo en evz de un objeto
export const selectCollectionsForPreview = createSelector([selectCollections], (collections) =>
    //recordemos que el keys nos regresa siempre un arreglo con cadenas de caracteres de los nombres de las propiedades
    Object.keys(collections).map((key) => collections[key])
);

//hay que encontrar el id que hace match con el collectionidmap
export const selectCollection = (collectionUrlParam) =>
    createSelector(
        [selectCollections],
        (collections) =>
            // nos va a regresar el elemento que de true
            // collections.find((collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
            //con el data normalization ya lo pasamos a un objeto, data nprmalization es guardar las cosas
            //en objetos en vez de arreglos
            collections[collectionUrlParam]
    );
//aqui pasa el currying que es una funcion que regresa otra funcion
