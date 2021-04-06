import React from 'react';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ id, name, price, imageUrl, addItem }) => {
    //la forma de yihua era abstraer todo en el collection preview para que llegue el item completo
    // const addItemToCart = () => {
    //     addItem({ id, name, price, imageUrl });
    // };

    return (
        <div key={id} className='collection-item'>
            <div className='image' style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
            </div>
            {/* recordemos que podemos pasar funciones anónimas dentro de los onclicks, etc. */}
            <CustomButton inverted onClick={() => addItem({ id, name, price, imageUrl })}>
                Add to cart
            </CustomButton>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
