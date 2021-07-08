// va a ser un componente que va a envolver al componente
// import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { compose } from 'redux';

import { selectIsCollectionfetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import collectionsOverview from './collections-overview.components';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionfetching,
});

// le va a pasar los props al withspinner y luego le mete el collectionsoverview
const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(collectionsOverview);

export default CollectionsOverviewContainer;
