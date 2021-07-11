import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

//lo pasa por defecto
const CartDropdown = ({ cartItems, history, dispatch }) => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    //
                    cartItems.length ? (
                        cartItems.map((item) => {
                            console.log(item);
                            return <CartItem key={item.id} item={item} />;
                        })
                    ) : (
                        <span className='empty-message'>Your cart is empty</span>
                    )
                }
            </div>
            <CustomButton
                onClick={() => {
                    history.push('/checkout');
                    //le despachamos la accion creada, usamos el dispatch que entra por defecto
                    dispatch(toggleCartHidden());
                }}>
                GO TO CHECKOUT
            </CustomButton>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});

//si no ponemos explicitamente el mapdispatch to props connect ya nos pasa el dispatch como una prop

//el orden importa, el router va a pasar los objetos al componente que ya nos hace el connect
//se hace de adentro hacia afuera
export default withRouter(connect(mapStateToProps)(CartDropdown));

// import { connect } from 'react-redux';

// const CartDropdown = ({ hidden }) => (
//     <div>
//         {hidden ? (
//             null
//         ) : (
//             < className='cart-dropdown'>
//                 <div className='cart-items'></div>
//                 <CustomButton>GO TO CHECKOUT</CustomButton>
//             </>
//         )}
//     </div>
// );

// const mapStateToProps = ({ cart }) => ({
//     hidden: cart.hidden,
// });

// export default connect(mapStateToProps)(CartDropdown);
