import React from 'react';
//ya no lo necesitamos
// import SHOP_DATA from './shop.data.js';
import './shop.styles.scss';
import CollectionOverview from '../../components/collections-overview/collections-overview.components';
// import CollectionPreview from '../../components/collection-preview/collection-preview.component';
// import { createStructuredSelector } from 'reselect';
// import { connect } from 'react-redux';
// import { selectCollections } from '../../redux/shop/shop.selectors';

const ShopPage = ({ collections }) => (
    <div className='shop-page'>
        <CollectionOverview />
    </div>
);

export default ShopPage;
