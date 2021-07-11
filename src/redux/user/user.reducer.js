//funcion con ds propiedades, e ultimo estado o el inicial y la accion(objeto con tipo y la carga)

import UserActionTypes from './user.types';

//a la primera no va a haber estado por lo que debemos hacer uno inicial
const INITIAL_STATE = {
    currentUser: null,
    error: null,
};

//VALOR POR DEFECTO PARA EL ARGUMENTO, NUNCA ESTARÁ INDEFINIDO
const userReducer = (state = INITIAL_STATE, action) => {
    //dependiendo e¿del tipo es cómo regresa todo
    switch (action.type) {
        // todos los reducers reciben todas las acciones
        case UserActionTypes.SING_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
            };
        case UserActionTypes.SING_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

//ahora lo pasamos al root
export default userReducer;
