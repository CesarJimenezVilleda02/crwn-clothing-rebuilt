import React from 'react';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.components';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.component';
import './shop.styles.scss';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionpageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    // react ya lo hace en el fonde desde una versión nueva.
    state = {
        isLoading: true,
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        // cada que cambie y la primera vez nos va a mandar el snapshot
        collectionRef.onSnapshot(async (snapshot) => {
            // console.log(snapshot);

            updateCollections(convertCollectionsSnapshotToMap(snapshot));
            this.setState({ isLoading: false });
        });
    }

    render() {
        const { match } = this.props;
        const { isLoading } = this.state;
        return (
            <div className='shop-page'>
                {/* recordemos qu eun raoute siempre pasa location, history y match, como shop esta dentro de un router tambien 
    los recibe, queremos que nuestra coleccion sauq ela categoria correcta para desplegar esa categoría, no queremos todos los 
    items, por eso le vamos a decir al route que el routename sea una cadena que determinaremos*/}
                {/* queremos el path actual */}

                <Route
                    exact
                    path={`${match.path}`}
                    // el render lleva una funcion que recibe los aparametros y se los mete al componente
                    render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />}
                />
                {/* esto nos deja acceder al category id en el objeto match dentro de la category page, con los 
            dos puntos le decimos que vamos a querer aparamtros y lo que va luego de los dos puntos es lo que 
            queremos usar para nombrer el parametro */}
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionpageWithSpinner isLoading={isLoading} {...props} />}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
