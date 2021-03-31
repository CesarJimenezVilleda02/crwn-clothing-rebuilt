import React from 'react';
import './menu-item.component.scss';

// con el destructuring lo sacamos del objeto props que llega
const MenuItem = ({ title, imageUrl, size }) => {
    return (
        // style toma un objeto de valores iguales a css del estilo que s ele quiere aplicar a un componente
        <div
            // style={{
            //     backgroundImage: `url(${imageUrl})`,
            // }}
            // se aplica el menu item y la clase del size que se ocupa, va entre corchetes porque queremos poner js

            className={`menu-item ${size}`}>
            {/* lo agregamos aqui porque conviene que el efecto sea dentro del div */}

            <div
                className='background-image'
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}></div>

            <div className='content'>
                {/* claro que también se podría con el text transform */}
                <h1 className='title'>{title.toUpperCase()}</h1>
                <span className='subtitle'>{'Shop Now'.toUpperCase()}</span>
            </div>
        </div>
    );
};

export default MenuItem;
