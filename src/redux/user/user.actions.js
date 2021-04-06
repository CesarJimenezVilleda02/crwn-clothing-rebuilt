import { UserActionTypes } from './user.types';

//cada objeto debe de estar en el formato adecuado de action y payload para funcionar
export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
});
