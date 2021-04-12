import React from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

//ahora tenemoe el match que nos llega de la shop
const CollectionPage = ({ match, collection }) => {
    // console.log(match.params.collectionId);
    //---> llega el url hasta aqui y un atributo params que guarda un objeto con la probiedad categoryId
    //vamos a usar este parametro para
    // console.log(collection);
    return (
        <div className='category'>
            <h2>{collection.title}</h2>
        </div>
    );
};

//el primer argumento del mapstate siempre es el state que inyectamos, el segundo siempre son los props que llegan
//por accion de otros componentes al nuestro
const mapStateToProps = (state, ownProps) => ({
    //lo que estamos haciendo es que el selector recibe un argumento que
    //pasa por todos los selectores anteriores hasta afectar el resultado del selector
    collection: selectCollection(ownProps.match.params.collectionId)(state), //como regresa una funcion le metemos el estado
    //lo que pasa aqui es que nos regresa un createselector que crea una funcion que recibe el estado, por lo que
    //debemos de volver a meter el estado para que pase por cualquier selector que lo ocupe
    //BASICAMENTE: nos regresa la cadena de selectores y a esos hay que meterles el estado, que luego cuando llega a
    //el que no sinteresa a través del flow ya llega acortado y usa el collectionid
});

export default connect(mapStateToProps)(CollectionPage);
