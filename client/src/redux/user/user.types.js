//es mejor practica guardar los tipos en un objeto para que sean consistentes
const UserActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
    EMAIL_SING_IN_START: 'EMAIL_SING_IN_START',
    SING_IN_SUCCESS: 'SING_IN_SUCCESS',
    SING_IN_FAILURE: 'SING_IN_FAILURE',
    CHECK_USER_SESSION: 'CHECK_USER_SESSION',
    SIGN_OUT_START: 'SIGN_OUT_START',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
};

export default UserActionTypes;
