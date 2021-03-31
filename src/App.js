import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';

//componente con el que envolveremos la app para darle la funcionalidad
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
    return (
        <div className='App'>
            {/* <Router>
                es como una función que recibe argumentos
                con path es la condicion de url que debe de pasar para que se renderee lo que ponemos en componente
                el exact es un bool que define si el path debe ser exato, si se deja solo exact significa true 
                por ejemplo, mypage.com/hola renderearia el componente si no fuera exacto, tecnicamente seguiría
                rendereando aunque no fuera exacto
                <Route exact path='/' component={HomePage} />
                <Route path='/hats' component={HatsPage} />
            </Router> */}
            <Router>
                <Switch>
                    {/* switch solo rendereara la que haga match, si encuentra que el / jala, ya no checa lo demás y solo renderea eso
                solo poniendo el exact en el path del homepage podemos prevenir que ya no cheque lo demás*/}
                    <Route exact path='/' component={HomePage} />
                    {/* el history solo pasa 1 hijo*/}
                    <Route path='/shop' component={ShopPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
