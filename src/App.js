import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { Route, Switch } from 'react-router-dom';

//conectar con redux y el store
import { connect } from 'react-redux';
//importamos la accion que nos va a ayudar a cambiar el state
import { setCurrentUser } from './redux/user/user.actions';

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
        const { setCurrentUser } = this.props;

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
                    <Route exact path='/shop' component={ShopPage} />
                    <Route exact path='/signin' component={SignInAndSignOut} />
                </Switch>
            </div>
        );
    }
}

//dispatch es la forma de saber que lo que le pases va a ir a los reducers
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    //le pasamos la funcion que hace la accion con el usuario que irá de payload para que el objeto formado llegue a
    //los reducers
});

//ya no necesitamos el state del usuario en app
export default connect(null, mapDispatchToProps)(App);

//ya no es necesario modificar el header para que en el sign out también se cambie el estado, porque lo que hace es
//modificar el objeto auth y nosotros escuchamos los cambios en el objeto auth en app, no en header
