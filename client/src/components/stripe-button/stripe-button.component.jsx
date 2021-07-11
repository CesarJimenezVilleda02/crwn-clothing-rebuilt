import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
// para requests
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    //stripe va a querer el precio en centavos
    const priceForStripe = price * 100;
    const publishableKey =
        'pk_test_51HiFIVFvjKAeBp1I8CDBmWjZ6tS9vh2gE3qxcQ4dwIgsP6iVbeEZDxCupThkRYivlLFxzX8jNt3Gk08qW45MAgkt00O6qIodne';

    const onToken = (token) => {
        axios({
            // va a usar la url actual y le va a pegar el payment
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token,
            },
        })
            .then((res) => {
                alert('payment successful');
            })
            .catch((error) => {
                console.log('error: ', JSON.parse(error));
                alert('Payment rejected. Please check your payment information');
            });
    };

    //con las propiedaddes que le metamos vamos a poder definir cómo queremos que sea
    return (
        <StripeCheckout
            label='Pay now'
            name='Crown clothing reworked'
            billingAddress
            shippingAddress
            image=''
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            // stripe va a manejar el exito de la transacción, con la callback de token vamos a saber que si fue
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
