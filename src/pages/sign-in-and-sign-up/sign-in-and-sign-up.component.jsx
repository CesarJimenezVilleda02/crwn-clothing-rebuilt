import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';

import './sign-in-and-sign-up.styles.scss';

//va a ser funcional para que el estado se mantenga en los componentes de menor jerarquia
const SignInAndSignOut = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
    </div>
);

export default SignInAndSignOut;
