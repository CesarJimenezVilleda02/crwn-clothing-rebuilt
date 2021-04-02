import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

//para poder sabes que ya hay usuarios vamos a usar el objeto auth
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: 'null',
        };
    }

    unsubscribeFromAuth = null;

    //queremos que se actualice el state cada que el usuario cambia de alguna forma
    //recordeos que el component did mount es una funcion que se llama solo cuando se renderea el componente
    componentDidMount() {
        //el parametro es el estado del user en firebase
        //es como un event listener, nos deja tener una persistencia de sesion del usuario
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            //le ponemos e async por firebase
            //es un sistema de mensajeria abierto entre nustro proyecto y firebase, siempre que se monte
            //va a estar abierto por lo que hay que cerrarlo

            // createUserProfileDocument(user);

            // this.setState({ currentUser: user });
            // // console.log(this.state.currentUser);

            //segunda version, user pasa a ser userAuth, son lo mismo
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                ///lo que haces es poner un listener a los cambios en el snapshot
                userRef.onSnapshot((snapShot) => {
                    // console.log(snapShot.data()); //asi obtenemos un objeto con los datos de usuario
                    this.setState(
                        {
                            currentUser: {
                                // recordemos eu el id llega con el paquete original
                                id: snapShot.id,
                                //spredeamos en el objeto el resto de propiedades accesibles con data()
                                ...snapShot.data(),
                            },
                        },

                        //recordemos que no podemos llamar el console.log después del setstate porque este asincronico
                        //por lo que lo pasamos como segundo argumento al metodo setstate
                        () => console.log(this.state)
                    );
                });
                //si esta vacio y ya hicimso el sign out
            } else {
                this.setState({ currentUser: null });
            }
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
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route exact path='/signin' component={SignInAndSignOut} />
                </Switch>
            </div>
        );
    }
}

export default App;
