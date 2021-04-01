import React from 'react';
//hacemos que el browser router llegue pero con el nombre que nosotros queramos, no obstante, ya no es necesario
//porque envuelves toda la aplicación con él
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './header.styles.scss';

//para importar svgs a react o que haces es decirle a react que va a tener un componente que va a renderear un svg
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = () => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            <Link className='option' to='/signin'>
                SIGN IN
            </Link>
        </div>
    </div>
);

export default Header;
