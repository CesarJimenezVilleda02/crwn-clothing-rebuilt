import React from 'react';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.components';
import CollectionPage from '../collection/collection.component';
import './shop.styles.scss';

const ShopPage = ({ match }) => {
    console.log(match.path);
    // --> /shop
    return (
        <div className='shop-page'>
            {/* recordemos qu eun raoute siempre pasa location, history y match, como shop esta dentro de un router tambien 
    los recibe, queremos que nuestra coleccion sauq ela categoria correcta para desplegar esa categoría, no queremos todos los 
    items, por eso le vamos a decir al route que el routename sea una cadena que determinaremos*/}
            {/* queremos el path actual */}
            <Route exact path={`${match.path}`} component={CollectionOverview} />
            {/* esto nos deja acceder al category id en el objeto match dentro de la category page, con los 
            dos puntos le decimos que vamos a querer aparamtros y lo que va luego de los dos puntos es lo que 
            queremos usar para nombrer el parametro */}
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
    );
};

export default ShopPage;
