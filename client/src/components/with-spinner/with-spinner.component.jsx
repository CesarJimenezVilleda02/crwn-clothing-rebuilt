import React from 'react';
import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

// hacemos un nuevo componente, una funcion que toma un componente y le dota una funcionalidad
const WithSpinner =
    // este es el que llega

    // el shop component es el que va a saber si hay o no hay datos porque a el le llegan, por
    // eso la logica del with spinner la pondremos ahí


        (WrappedComponent) =>
        // basado en la propiedad que trae el wrapped nos llegan estas
        ({ isLoading, ...otherProps }) => {
            // se retorna dinamicamente el spinner o el que llega
            return isLoading ? (
                <SpinnerOverlay>
                    <SpinnerContainer />
                </SpinnerOverlay>
            ) : (
                <WrappedComponent {...otherProps} />
            );
        };

// de otra forma
const WithSpinner2 = (WrappedComponent) => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        );
    };
    return Spinner;
};

export default WithSpinner;
