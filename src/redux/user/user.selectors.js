import { createSelector } from 'reselect';

const selectUser = (state) => state.user;
// const selectCart = state => state.cart;

//en vez de ser argumentos, los puedes mandar como argumentos
// export const selectCurrentUser = createSelector([selectUser, selectCart], (user, cart) => user.currentUser);
export const selectCurrentUser = createSelector([selectUser], (user) => user.currentUser);
