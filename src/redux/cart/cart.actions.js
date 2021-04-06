import { CartActionTypes } from './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
    // EL PAYLOAD DE HECHO ES OPCIONAL, COMO NO SE USA PUES NO HAY PEDO
});

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item,
});

export const clearItemFromCart = (item) => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item,
});

export const removeItem = (item) => {
    console.log(item);
    return {
        type: CartActionTypes.REMOVE_ITEM,
        payload: item,
    };
};
