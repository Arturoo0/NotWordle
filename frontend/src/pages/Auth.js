import React from 'react';
import { AuthForm } from '../components';

const Auth = () => {
    const AuthPageContainer = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#112D4E'
    };

    return (
        <div style={AuthPageContainer}> 
            <AuthForm />
        </div>
    );
};

export default Auth;