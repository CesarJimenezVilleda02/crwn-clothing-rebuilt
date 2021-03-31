import React from 'react';
//with router es un componente de ato orden --- es como una funcion toma un componente como argumento
//y te regresa un componente modificado
import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss';

// con el destructuring lo sacamos del objeto props que llega con las propiedades spredeadas
const MenuItem = ({ title, imageUrl, size, history, match }) => {
    // console.log(match.url);
    return (
        //no sabemos en donde estaremos en nuestro directorio, por lo que usaremos la url del match
        //recordemos que esta url se define por el match qu ehace en primera instancia el routing con
        //las urls de cada componente
        <div className={`menu-item ${size}`} onClick={() => history.push(`${match.url}${title}`)}>
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

//lo pasamos como argumento y nos regresa un componente superpoderoso con acceso a los props y con esto
//ganamos acceso a history
export default withRouter(MenuItem);
