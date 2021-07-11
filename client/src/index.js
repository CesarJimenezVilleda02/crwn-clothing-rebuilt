//aqui se va a poner el nuevo componente de redux para que la app tenga acceso al reducer y va a ser el provide
import { Provider } from 'react-redux'; //es un componente padre de todo redux
//hace que todo la app tenga acceso al redux, debe ser el papa de todo
// import Store from './redux/store';

import React from 'react';
import ReactDOM from 'react-dom';
// se debe de poner desde aqui para que se pueda aplicar a toda la app sin que andes poniendolo siempre
import { BrowserRouter } from 'react-router-dom';

//ahora hacemos que llegue el persist y el componente que le va a dar el nuevo contexto
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

ReactDOM.render(
    // ya con esto toda la app a a tener acceso a la store
    <Provider store={store}>
        <BrowserRouter>
            {/* la funcion del persistgate es delayear los datos hasta que la app haya cargado */}
            <PersistGate persistor={persistor}>
                {/* queemos que nuestra app siempre tenga acceso al persist */}
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
