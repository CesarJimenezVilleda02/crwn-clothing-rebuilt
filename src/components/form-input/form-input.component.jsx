import React from 'react';

import './form-input.styles.scss';

//el handle change es para que se vaya para arriba
const FormInput = ({ handleChange, label, ...otherProps }) => {
    console.log(otherProps.value.length);
    return (
        <div className='group'>
            {/* las other props van a ser el nombre el tipo y si es requerido por ejemplo */}
            <input className='form-input' onChange={handleChange} {...otherProps} />
            {/* con esto ya que el user ha tipeado algo se agrega el shrink para que se haga chiqito */}
            {label ? (
                <label className={`form-input-label ${otherProps.value.length ? 'shrink' : ''}`}>{label}</label>
            ) : null}
        </div>
    );
};

export default FormInput;
