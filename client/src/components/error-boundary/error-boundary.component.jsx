import React from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

// vamos a escribir un class component porque necesitamos acceso a los lifecycle methods
// que de forma implícita puede usar react para detectar errores
class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false,
        };
    }

    // lo que vamos a hacer es envolver a los hijos con este componente
    // este es un lifecycle de los error boundarys, react solito va a detectar que esta clase es de
    // eror boundarys
    static getDerivedStateFromError(error) {
        // debemos hacerlo manual porque si no no sabemos si los hijos tuvieron error
        return {
            hasErrored: true,
        };
    }

    // otro de los error boundarys
    componentDidCatch(error, info) {
        console.error(error);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/oCkEbrA.png' />
                    <ErrorImageText>Sorry, this page is broken.</ErrorImageText>
                </ErrorImageOverlay>
            );
        } else {
            return this.props.children;
        }
    }
}

// podriamos usarlo para distintos errores especificos que rendereeen distintos componentes de
// acorde a lo que pase
export default ErrorBoundary;
