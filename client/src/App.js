// import './App.css';
import React, { useEffect, lazy, Suspense } from 'react';
// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
// import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
// import CheckoutPage from './pages/checkout/checkout.component.jsx';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// para el persist
import { checkUserSession } from './redux/user/user.actions';

// importamos el estilo blobal
import { GlobalStyle } from './GlobalStyles.styles.js';

// impprtamos el componente para cuando va a estar suspendido
import Spinner from './components/spinner/spinner.component';

import ErrorBoundary from './components/error-boundary/error-boundary.component';

// cuando la aplicación deba ser rendereada se llamará esta función
// lazy es una funcon que recibe una funcion que debe retornar el import
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
// el problema es que es asincronico y puede haber un momento en el que el usuario no vea nada,
//para esto vamos a usar suspense, este es un nuevo componente que envuelve las partes de una
// aplicacion que pueden estar rendereando de forma asincrónica
const ShopPage = lazy(() => import('./pages/shop/shop.component.jsx'));
// const Header = lazy(() => import('./components/header/header.component.jsx'));
const SignInAndSignOut = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component.jsx'));

const App = ({ currentUser, checkUserSession }) => {
    useEffect(() => {
        checkUserSession();
        // como ya habíamos comentado, el empty array es para que pase como un component did mount
    }, [checkUserSession]);
    // como es una funcion propiedad la podemos pasar porque no va a cambiar la funcion

    return (
        <div>
            <GlobalStyle />
            <Header />
            <Switch>
                {/* el suspense va a tener una propiedad fallback con HTML de lo que va a renderear mientras espera
                envolviendo todos con el suspense ya hacemos que el loading afecte a todos
                */}
                {/* si algo de lo de adentro se rompe, el error boundary con el que lo envolvimos
                va a usar el componente que le creamos */}
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Route exact path='/' component={HomePage} />

                        <Route path='/shop' component={ShopPage} />

                        <Route
                            exact
                            path='/signin'
                            render={() => (currentUser ? <Redirect to='/' /> : <SignInAndSignOut />)}
                        />

                        <Route exact path='/checkout' component={CheckoutPage} />
                    </Suspense>
                </ErrorBoundary>
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
