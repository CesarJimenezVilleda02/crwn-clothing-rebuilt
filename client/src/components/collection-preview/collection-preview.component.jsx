import React from 'react';
import { withRouter } from 'react-router';
import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss';

// //cada vez que se llama el componente se hace la operacion del filtro
// //hay que recordar que cada vez que se llama una funcion se llama con dada rendereada del componente
const CollectionPreview = ({ title, items, history, match }) => {
    // const { history, match, title, items } = props;
    return (
        <div className='collection-preview'>
            <h1 className='title' onClick={() => history.push(`${match.url}/${title.toLowerCase()}`)}>
                {title.toUpperCase() + ' >'}
            </h1>
            <div className='preview'>
                {items
                    //solo nos aparezcan los primeros 4 items
                    .filter((item, i) => i < 4)
                    .map(({ id, ...other }) => (
                        <CollectionItem key={id} {...other} id={id} />
                    ))}
            </div>
        </div>
    );
};

export default withRouter(CollectionPreview);
