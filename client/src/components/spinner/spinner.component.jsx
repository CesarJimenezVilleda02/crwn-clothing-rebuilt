import React from 'react';
import { SpinnerOverlay, SpinnerContainer } from './spinner.styles';

// hacemos un nuevo componente, una funcion que toma un componente y le dota una funcionalidad
const Spinner =
    // este es el que llega
    // el shop component es el que va a saber si hay o no hay datos porque a el le llegan, por
    // eso la logica del with spinner la pondremos ahí

    () => {
        // se retorna dinamicamente el spinner o el que llega
        return (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        );
    };

export default Spinner;
