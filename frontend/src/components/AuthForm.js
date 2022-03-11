import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { post } from '../utils/baseRequest.js';

const AuthForm = () => {
    const [ email, setEmail ] = useState(null);
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ authType, setAuthType ] = useState('login');

    const handleUserSumbmission = () => {
        const userCredentials = { 
            'email' : email, 
            'username': username, 
            'password': password
        }
        switch (authType){
            case 'login':
                post('/auth/login', userCredentials);
                break;
            case 'signup':
                post('/auth/signup', userCredentials);
                break;
        }
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

    return (
        <div>
            <Form.Select onChange={(event) => setAuthType(event.target.value)}>
                <option value='login'>Login</option>
                <option value='signup'>Signup</option>
            </Form.Select>
            {renderFormInputs()}
            <p/>
            <Button 
                variant="primary" 
                onClick={() => {handleUserSumbmission()}}
            >Submit</Button>{' '}
        </div>
    )
};

export default AuthForm;
