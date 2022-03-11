import React, { useState } from 'react';

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
                <p>{inputType.credential}</p>
                <input onChange={(event) => inputType.update(event.target.value) }></input>
            </div>
        );
        return inputs;
    };

    return (
        <div>
            {renderFormInputs()}
            <p/>
            <button onClick={() => { handleUserSumbmission() }}>Submit</button>
        </div>
    )
};

export default AuthForm;