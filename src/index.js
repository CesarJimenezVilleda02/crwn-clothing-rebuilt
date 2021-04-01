import React from 'react';
import ReactDOM from 'react-dom';
// se debe de poner desde aqui para que se pueda aplicar a toda la app sin que andes poniendolo siempre
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
