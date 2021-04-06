import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
//para crear el structured selectot
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

//1.- importamos connect: es un componente de alto orden en el que envolvemos las cosas para tener acceso a redux
import { connect } from 'react-redux';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
            {currentUser ? <h3>{'Welcome ' + currentUser.displayName}</h3> : <div></div>}
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
            ) : (
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {/* ahora necesitamos crear algo que nos permita ocultarlo */}
        {hidden ? null : ( //con null ya no te sale nada porque si pones un div vacio por el space between todo se va alv
            <CartDropdown />
        )}
    </div>
);

//SIN RESELECT
// //este va a ser para meterle el state al componente
// const mapStateToProps = (
//     //destructurar nesteds, solo los rojos salen coo variables
//     { user: { currentUser }, cart: { hidden } } //puede llamarse como sea pero este es el standard
// ) => ({ currentUser, hidden });

//CON RESELECT
// const mapStateToProps = (state) => ({ currentUser: selectCurrentUser(state), hidden: selectCartHidden(state) });

//con create structured selector
const mapStateToProps = createStructuredSelector({
    //les pasa el estado actual de forma automatica
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
