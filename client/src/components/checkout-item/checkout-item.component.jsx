import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({
    cartItem,
    cartItem: { name, imageUrl, price, quantity, id },
    clearItemFromCart,
    increaseQuantity,
    decreaseQuantity,
}) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img alt='item' src={imageUrl} />
        </div>
        {/* utf-8 dingbats -- caracteres y simbolos a partir de codigos, iconos de los que el browser esta enterado */}
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={() => decreaseQuantity(cartItem)}>
                &#10094;
            </div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={() => increaseQuantity(cartItem)}>
                &#10095;
            </div>
        </span>
        <span className='price'>{price}</span>
        {/* recordemos que empieza con & y termina con ; */}
        <div className='remove-button' onClick={() => clearItemFromCart(cartItem)}>
            &#10005;
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    //el nombre con el que pones la propiedad es el nombre con el que llega a las props
    clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
    increaseQuantity: (item) => dispatch(addItem(item)),
    decreaseQuantity: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
