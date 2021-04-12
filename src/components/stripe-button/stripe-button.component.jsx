import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    //stripe va a querer el precio en centavos
    const priceForStripe = price * 100;
    const publishableKey =
        'pk_test_51HiFIVFvjKAeBp1I8CDBmWjZ6tS9vh2gE3qxcQ4dwIgsP6iVbeEZDxCupThkRYivlLFxzX8jNt3Gk08qW45MAgkt00O6qIodne';

    const onToken = (token) => {
        console.log(token);
        //es lo que usa stripe para hacer una carga a una tarjeta
        alert('Payment successful');
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
