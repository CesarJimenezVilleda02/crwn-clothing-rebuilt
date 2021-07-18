import React from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
//metemos el selector para namas jalar una parte
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
//el que no se va a dejar combinar
import { createStructuredSelector } from 'reselect';

const Directory = ({ sections }) => (
    // <div className='directory-menu'>
    //     {this.state.sections.map((section) => {
    //         <MenuItem id={section.id} imageUrl={section.imageUrl} title={section.imageUrl} />;
    //     })}
    // </div>
    //recordemos que se pueden desestructurar los objetos que llegan y se reducen a las variables con los nombres de
    //sus propiedades
    <div className='directory-menu'>
        {sections.map(({ id, ...otherProps }) => {
            console.log(otherProps);
            //esto sería el equivalente a pasar todo como en el anterior, pasan con su mismo nombre
            return <MenuItem key={id} id={id} {...otherProps} />;
        })}
        {/* {this.state.sections.map(({ title, imageUrl, id, size }) => (
                    <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
                ))} */}
    </div>
);

//lega el estado por el connect
// const mapStateToProps = (state) => ({
//     sections: state.directory,
// });
const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
