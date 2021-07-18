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

// styled components css in js
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles.jsx';

// le metemos la accion
import { signOutStart } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
            {currentUser ? <h3>{'Welcome ' + currentUser.displayName}</h3> : <div></div>}
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            {currentUser ? (
                <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
            ) : (
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            )}
            <CartIcon />
        </OptionsContainer>
        {/* ahora necesitamos crear algo que nos permita ocultarlo */}
        {hidden ? null : ( //con null ya no te sale nada porque si pones un div vacio por el space between todo se va alv
            <CartDropdown />
        )}
    </HeaderContainer>
);

//con create structured selector
const mapStateToProps = createStructuredSelector({
    //les pasa el estado actual de forma automatica
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
