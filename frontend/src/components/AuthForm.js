import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AuthForm = () => {
    const [ email, setEmail ] = useState(null);
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);

    const handleUserSumbmission = () => {
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
