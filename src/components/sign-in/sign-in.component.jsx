import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit = async (event) => {
        // evitar que se recargue la pagina
        event.preventDefault();

        const { email, password } = this.state;

        try {
            //
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                email: '',
                password: '',
            });
        } catch (error) {
            alert('Something failed while trying to sign in: ', error);
        }
    };

    //esto sigue jalando porque recordemos que las funciones tienen memoria de donde se crean y al ser el state un objeto
    //el componente de menor jerarquia al emplear la función sigue referenciando el state del componente original
    handleChange = (event) => {
        // console.log(event.target.value);
        const { value, name } = event.target;

        this.setState({
            // recordemos que el nombre de cada propiedad se puede computar en JS
            [name]: value,
        });
        // console.log(this.state);
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with email and password</span>

                {/* recordemos que al subir una forma esta va a recargar la pagina por l que se debe de prevenir el evento por defecto */}
                <form onSubmit={this.handleSubmit}>
                    {/* le pasamos la funcion a la que va a llamar cada que se active */}
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required
                        label='Email'
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        // para que se pase el que va a manejar los cambios en el field
                        handleChange={this.handleChange}
                        required
                        label='Password'
                    />
                    <div className='buttons'>
                        {/* un boton puede tener el tipo submit tambien */}
                        {/* <input type='submit' value='Sign In' /> */}
                        {/* recordemos que al pasar mas jsx dentro de un componente le llega en una prop llamada children */}
                        <CustomButton type='submit'>Sign In</CustomButton>

                        {/* solo le agregas el sign in para que jale al funcion cuando le das click con un onclick */}
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn type='submit'>
                            Sign In with google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
