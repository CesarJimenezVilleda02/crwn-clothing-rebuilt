import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = () => {
    const [getCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { displayName, email, password, confirmPassword } = getCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            //crea un nuevo usuario asociado al email y al password, nos regresa un user auth object
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            setCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        // console.log(event.target.value);
        const { value, name } = event.target;

        setCredentials({
            // recordemos que el nombre de cada propiedad se puede computar en JS
            ...getCredentials,
            [name]: value,
        });
        // console.log(this.state);
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    required
                    label='Name'
                    handleChange={handleChange}
                />
                <FormInput type='email' name='email' value={email} required label='Email' handleChange={handleChange} />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    required
                    label='Password'
                    handleChange={handleChange}
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    required
                    label='Confirm Password'
                    handleChange={handleChange}
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    );
};

export default SignUp;
