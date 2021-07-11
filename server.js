const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// nos deja usar pathing para los directorios
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// bajamos el stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// esto va a crear una app de express
const app = express();
const port = process.env.PORT || 5000;

// esto dice que queremos que todo el body se pase a json, es un middleware que la plica el .json()
app.use(bodyParser.json);
// es una forma de hacer que las urls que pasamos tengan los caracteres correctos
app.use(bodyParser.urlencoded({ extended: true }));

// cross-origin-request
// se hostea en un lugary el frontend en otro, cuando este haga un request el server va a checar que es el origen
// adecuado, sino va a mandar alv la request de datos
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    // queremos que use este middleware para determinar que queremos servir lo del build en la ruta
    // que le pasemos
    app.use(express.static(path.join(__dirname, 'client/build')));
    // es como decrirle a la app que cosas son para cada request
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, (error) => {
    if (error) throw error;
    console.log('Server running on port' + port);
});

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'mxn',
    };

    // xpn esto lo ,amdamos a client
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (err) res.status(500).send({ err: stripeErr });
        else res.status(300).send({ success: stripeRes });
    });
});
