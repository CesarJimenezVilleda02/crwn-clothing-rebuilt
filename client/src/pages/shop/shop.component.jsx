import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
// import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container';
import { connect } from 'react-redux';
// import { updateCollections } from '../../redux/shop/shop.actions';
// import CollectionPage from '../collection/collection.container';
import './shop.styles.scss';

// cambiamos esto por la accion que manda el typo del payload al que escuchamos
// import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

const CollectionOverviewContainer = lazy(() =>
    import('../../components/collections-overview/collections-overview.container')
);

const CollectionPage = lazy(() => import('../collection/collection.container'));

const ShopPage = ({ fetchCollectionsStart, match }) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);
    // si el padre llama su re-render, el use-effect de este se va a llamar dos veces si tiene e array vacío o no lo
    // tiene, como sabemos que el fetch no cambia pues no va a re-renderear varias veces

    return (
        <div className='shop-page'>
            <Suspense fallback={<Spinner />}>
                <Route
                    exact
                    path={`${match.path}`}
                    // lo regresamos a componente porque ya no es necesario pasarle nada
                    component={CollectionOverviewContainer}
                />
                <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
            </Suspense>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
