import React from 'react';
import { Route } from 'react-router-dom';
import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container';
import { connect } from 'react-redux';
// import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.container';
import './shop.styles.scss';

// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// vamos a usar la función que hicimos
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
// import { selectIsCollectionfetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
// import { createStructuredSelector } from 'reselect';

// no hay necesidad de pasarles el state de las colecciones porque ya lo sacan ellas mismas
// const CollectionOverviewContainer = WithSpinner(CollectionOverview);
// const CollectionpageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { fetchCollectionStartAsync } = this.props;
        fetchCollectionStartAsync();
    }

    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                {/* recordemos qu eun raoute siempre pasa location, history y match, como shop esta dentro de un router tambien 
    los recibe, queremos que nuestra coleccion sauq ela categoria correcta para desplegar esa categoría, no queremos todos los 
    items, por eso le vamos a decir al route que el routename sea una cadena que determinaremos*/}
                {/* queremos el path actual */}

                <Route
                    exact
                    path={`${match.path}`}
                    // lo regresamos a componente porque ya no es necesario pasarle nada
                    component={CollectionOverviewContainer}
                />
                {/* esto nos deja acceder al category id en el objeto match dentro de la category page, con los 
            dos puntos le decimos que vamos a querer aparamtros y lo que va luego de los dos puntos es lo que 
            queremos usar para nombrer el parametro */}
                <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
