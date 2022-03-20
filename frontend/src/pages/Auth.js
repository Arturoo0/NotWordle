import React from 'react';
import { AuthForm } from '../components';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsFileEarmarkWord } from "react-icons/bs";

const Auth = () => {
    const navigate = useNavigate();
    const AuthPageContainer = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#112D4E',
        flexDirection: 'column'
    };

    return (
        <div style={AuthPageContainer}>
            <BsFileEarmarkWord style={{
                color: 'white',
                fontSize: '8em'
            }}/>
            <AuthForm />
            <Button
                onClick={(event) => {
                    event.preventDefault();
                    navigate('free-play');
                }}
            variant='outline-primary'>Continue without an account</Button>
        </div>
    );
};

export default Auth;