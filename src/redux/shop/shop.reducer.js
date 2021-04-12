import SHOP_DATA from './shop.data';

//RECORDEMOS QU EESTOS SON DATOS DIFERENTES
const INITIAL_STATE = {
    collections: SHOP_DATA,
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default shopReducer;
