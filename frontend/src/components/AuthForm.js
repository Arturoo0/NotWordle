import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { post } from '../utils/baseRequest.js';

const AuthForm = () => {
    const [ email, setEmail ] = useState(null);
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ authType, setAuthType ] = useState('login');

    const formStyle = {
        padding: '10px 30px',
        marginTop: '8px' 
    };

    const authTypeStyle = {
        display: 'flex'
    };

    const handleUserSumbmission = async () => {
        const userCredentials = { 
            'email' : email, 
            'username': username, 
            'password': password
        }
        let res;
        switch (authType){
            case 'login':
                res = await post('/auth/login', userCredentials);
                break;
            case 'signup':
                res = await post('/auth/sign-up', userCredentials);
                break;
        }
        const { error, message, sessionId } = res.data;
        (error || !sessionId) ? alert(error) : alert(message);  
        localStorage.setItem('sessionId', sessionId);
        return null;
    };

    const renderFormInputs = () => {
        const inputTypes = [
            { 'credential' : 'Email', 'update' : (userCredential) => { setEmail(userCredential)}},
            { 'credential' : 'Username', 'update' : (userCredential) => { setUsername(userCredential)}},
            { 'credential' : 'Password', 'update' : (userCredential) => { setPassword(userCredential)}}   
        ];
        const inputs = inputTypes.map((inputType) =>
            <div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{inputType.credential}</Form.Label>
                    <Form.Control 
                        placeholder={`Enter ${inputType.credential}`} 
                        onChange={(event) => inputType.update(event.target.value) }
                    />
                </Form.Group>
            </div>
        );
        return inputs;
    };

    const renderAuthTypeSelections = () => {
        return (
            <div style={authTypeStyle}>
                <div onChange={() => setAuthType('login')}>Login</div>
                <div onChange={() => setAuthType('signup')}>Signup</div>
            </div>
        );
    }

    return (
        <div>
            <Form.Select onChange={(event) => setAuthType(event.target.value)}>
                <option value='login'>Login</option>
                <option value='signup'>Signup</option>
            </Form.Select>
            <Card style={formStyle}>
                {renderFormInputs()}
                <p/>
                <Button 
                    variant="primary" 
                    onClick={() => {handleUserSumbmission()}}
                >Submit</Button>{' '}
            </Card>
        </div>
    )
};

export default AuthForm;
