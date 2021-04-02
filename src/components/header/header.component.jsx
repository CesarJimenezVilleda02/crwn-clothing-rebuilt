import React from 'react';
//hacemos que el browser router llegue pero con el nombre que nosotros queramos, no obstante, ya no es necesario
//porque envuelves toda la aplicación con él
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './header.styles.scss';

import { auth } from '../../firebase/firebase.utils';

//para importar svgs a react o que haces es decirle a react que va a tener un componente que va a renderear un svg
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({ currentUser }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
            <h3>{'Welcome ' + currentUser.displayName}</h3>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {currentUser ? (
                //este es un metodo que ya viene por defecto en el auth, el otro era para cerrar la comunicacion y este
                //para setear al state a null
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
            ) : (
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
        </div>
    </div>
);

export default Header;
