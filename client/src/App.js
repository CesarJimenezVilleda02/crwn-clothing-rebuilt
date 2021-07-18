// import './App.css';
import React, { useEffect } from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';

// la función que creamos
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
//selectors
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

//vamos a hacer que se redireccione cuando ya está signed in el user
import { Route, Switch, Redirect } from 'react-router-dom';

//conectar con redux y el store
import { connect } from 'react-redux';
//importamos la accion que nos va a ayudar a cambiar el state
import { setCurrentUser } from './redux/user/user.actions';

// para el persist
import { checkUserSession } from './redux/user/user.actions';

// importamos el estilo blobal
import { GlobalStyle } from './GlobalStyles.styles.js';

const App = ({ currentUser, checkUserSession }) => {
    useEffect(() => {
        checkUserSession();
        // como ya habíamos comentado, el empty array es para que pase como un component did mount
    }, [checkUserSession]);
    // como es una funcion propiedad la podemos pasar porque no va a cambiar la funcion

    return (
        <div>
            {/* con ponerlo una sola vez hasta arriba de todo la aplicación ya sirve */}
            <GlobalStyle />
            {/* <Header currentUser={this.state.currentUser} /> se lo quito porque ya está conectado al store */}
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                {/* se lo quitamos porque el shop va a estar variando, cuando varian debemos removerlo */}
                <Route path='/shop' component={ShopPage} />
                {/* con esta determinas qué componente renderear */}
                <Route
                    exact
                    path='/signin'
                    // el render nos deja definir de forma dinámica qué queremos que se renderee y en su ugar va una
                    //funcion que retornará el componente a renderear
                    render={() => (currentUser ? <Redirect to='/' /> : <SignInAndSignOut />)}
                />
                <Route exact path='/checkout' component={CheckoutPage} />
            </Switch>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
