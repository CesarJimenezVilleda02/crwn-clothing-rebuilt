import './App.css';
import React from 'react';
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

class App extends React.Component {
    componentDidMount() {
        const { checkUserSession } = this.props;
        checkUserSession();
    }

    render() {
        return (
            <div className='App'>
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
                        render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignOut />)}
                    />
                    <Route exact path='/checkout' component={CheckoutPage} />
                </Switch>
            </div>
        );
    }
}

//recordemos que del state va a llegar el usuario por eso lo podemos sacar
// const mapStateToProps = ({ user }) => ({
//     currentUser: user.currentUser, //user es el pedazo del state en el que definimos al current user
// });

// const mapStateToProps = (state) => ({
//     currentUser: selectCurrentUser(state),
// });

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
