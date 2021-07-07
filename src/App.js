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

// con este los vamos a mandar al firebase
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import { getByTitle } from '@testing-library/react';

class App extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         currentUser: 'null',
    //     };
    // }
    //ya no necesitamos este state

    unsubscribeFromAuth = null;
    componentDidMount() {
        const { setCurrentUser, collections } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapShot) => {
                    // console.log(snapShot.data()); //asi obtenemos un objeto con los datos de usuario
                    // this.setState(
                    //     {
                    //         currentUser: {
                    //             id: snapShot.id,
                    //             ...snapShot.data(),
                    //         },
                    //     }
                    // ); //ya no necesitamos esto, lo reemplazamos con la accion que tenemos
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    });
                    //asi ya le estamos metiendo el usuario que recibimos del snapshot a la creadora de acciones
                });
                //si esta vacio y ya hicimso el sign out
            }
            setCurrentUser(userAuth);

            //FIREBASE PARTE 2 -- LO QUITAMOS LUEGO DE LLAMARLO PORQUE SOLO SE OCUPA UNA VEZ
            // no queremos que pasen cosas como el id meado que hicimos o el routename
            // addCollectionAndDocuments(
            //     'collections',
            //     collections.map(({ title, items }) => ({ title, items }))
            // );
            // console.log('puto');
        });
    }

    componentWillUnmount() {
        //cierra la mensajeria
        //al igualarlo nos da una funcion que va a cerrar la operacion ,es como un ()(), el segundo lo cierrra
        this.unsubscribeFromAuth();
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
    collections: selectCollectionsForPreview,
});

//dispatch es la forma de saber que lo que le pases va a ir a los reducers
const mapDispatchToProps = (dispatch) => ({
    //al set current user le va allegar el usuario, el cual va a pasar al dispatch junto con el resultado
    //de llamarlo, la funcion crea el payload que entrerá
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    //le pasamos la funcion que hace la accion con el usuario que irá de payload para que el objeto formado llegue a
    //los reducers
});

//ya no necesitamos el state del usuario en app, tambien tenemos acceso al current user
export default connect(mapStateToProps, mapDispatchToProps)(App);

//ya no es necesario modificar el header para que en el sign out también se cambie el estado, porque lo que hace es
//modificar el objeto auth y nosotros escuchamos los cambios en el objeto auth en app, no en header
