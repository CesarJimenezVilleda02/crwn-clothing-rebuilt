import { createSelector } from 'reselect';

//INPUT SELECTOR -- no usa create selector Son funciones que obtienen todo el estado y solo regresan una parte
//esto se hace por convencion
const selectCart = (state) => state.cart; //ya con esto solo agarramos el state

//el primer argumento son los input selectors y el segundo será una funcion de lo que queremos
//regresar. Los argumentos que recibiremos iran en el orden de lo que regresa el selector
export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

//lo que vamos haciendo es reducir la porción de estado que nos va llegando
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartHidden = createSelector([selectCart], (cart) => cart.hidden);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
