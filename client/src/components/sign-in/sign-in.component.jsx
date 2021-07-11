import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [getCredentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const { email, password } = getCredentials;
    const handleSubmit = (event) => {
        console.log('im here');
        event.preventDefault();

        emailSignInStart(email, password);
    };

    const handleChange = (event) => {
        // console.log(event.target.value);
        const { value, name } = event.target;

        setCredentials({
            ...getCredentials,
            [name]: value,
            // recordemos que podemos crear de forma dinamica las propiedades
        });
        // console.log(this.state);
    };

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with email and password</span>

            {/* recordemos que al subir una forma esta va a recargar la pagina por l que se debe de prevenir el evento por defecto */}
            <form onSubmit={handleSubmit}>
                {/* le pasamos la funcion a la que va a llamar cada que se active */}
                <FormInput name='email' type='email' value={email} handleChange={handleChange} required label='Email' />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    // para que se pase el que va a manejar los cambios en el field
                    handleChange={handleChange}
                    required
                    label='Password'
                />
                <div className='buttons'>
                    {/* un boton puede tener el tipo submit tambien */}
                    {/* <input type='submit' value='Sign In' /> */}
                    {/* recordemos que al pasar mas jsx dentro de un componente le llega en una prop llamada children */}
                    <CustomButton type='submit'>Sign In</CustomButton>

                    {/* solo le agregas el sign in para que jale al funcion cuando le das click con un onclick */}
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                        Sign In with google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
