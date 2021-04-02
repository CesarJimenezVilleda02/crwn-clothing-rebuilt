//funcion con ds propiedades, e ultimo estado o el inicial y la accion(objeto con tipo y la carga)

//a la primera no va a haber estado por lo que debemos hacer uno inicial
const INITIAL_STATE = {
    currentUser: null,
};

//VALOR POR DEFECTO PARA EL ARGUMENTO, NUNCA ESTARÁ INDEFINIDO
const userReducer = (state = INITIAL_STATE, action) => {
    //dependiendo e¿del tipo es cómo regresa todo
    switch (action.type) {
        // todos los reducers reciben todas las acciones
        case 'SET_CURRENT_USER':
            // regresar todo lo que ya estaba, más lo nuevo
            return {
                ...state,
                currentUser: action.payload,
            };

        default:
            return state;
    }
};

//ahora lo pasamos al root
export default userReducer;
