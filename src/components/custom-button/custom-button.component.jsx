import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
    // si pasamos un tipo submit este le va a llegar al boton
    return (
        <button
            className={`custom-button ${isGoogleSignIn ? 'google-sign-in' : ''} ${inverted ? 'inverted' : ''}`}
            {...otherProps}>
            {children}
        </button>
    );
};

export default CustomButton;
