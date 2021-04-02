import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';

//1.- importamos connect: es un componente de alto orden en el que envolvemos las cosas para tener acceso a redux
import { connect } from 'react-redux';

const Header = ({ currentUser }) => (
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
        </div>
    </div>
);

//este va a ser para meterle el state al componente
const mapStateToProps = (
    state //puede llamarse como sea pero este es el standard
) =>
    //el state que llega es el del root
    ({ currentUser: state.user.currentUser });
//esto se refiere al objeto que va arecibir como prop, es decir, va a llegar una prop de current user
//que va a contener el current user dado por el userreducer en el estado grandote que resulta de la combina
//cion de los reducers

//a connect le vamos a pasar dos funciones y nos va a dar un nuevo componente conectado al que le pasaremos el original
export default connect(mapStateToProps)(Header);
