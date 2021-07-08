// va a ser un componente que va a envolver al componente
// import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { compose } from 'redux';

import { selectIsCollectionfetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import collection from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state),
});

// le va a pasar los props al withspinner y luego le mete el collectionsoverview
const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(collection);

export default CollectionsOverviewContainer;
