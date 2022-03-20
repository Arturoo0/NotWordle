import React from 'react';
import { Toast } from 'react-bootstrap';

const Alert = (props) => {
    const alertStyle = {
        position:'fixed',
        top: '20px',
        zIndex: '9999', 
        left: '50%',
        transform: 'translate(-50%, 0)'
    }

    return ( 
        <div style={alertStyle}>
            <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">NotWordle</strong>
                </Toast.Header>
                <Toast.Body>{props.alertText}</Toast.Body>
            </Toast>
        </div>
    );
};

export default Alert;