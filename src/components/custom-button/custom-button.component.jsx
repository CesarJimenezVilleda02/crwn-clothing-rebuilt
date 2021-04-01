import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, ...otherProps }) => {
    // si pasamos un tipo submit este le va a llegar al boton
    return (
        <button className='custom-button' {...otherProps}>
            {children}
        </button>
    );
};

export default CustomButton;
