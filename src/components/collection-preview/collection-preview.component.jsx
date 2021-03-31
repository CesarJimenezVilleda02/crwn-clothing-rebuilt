import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss';

// //cada vez que se llama el componente se hace la operacion del filtro
// //hay que recordar que cada vez que se llama una funcion se llama con dada rendereada del componente
const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
                //solo nos aparezcan los primeros 4 items
                .filter((item, i) => i < 4)
                .map(({ id, ...other }) => (
                    <CollectionItem key={id} {...other} />
                ))}
        </div>
    </div>
);

export default CollectionPreview;
