import React from 'react';
import { Toast } from 'react-bootstrap';
import { BsFileEarmarkWord } from "react-icons/bs";

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
                <Toast.Header onClick={() => props.closeAlert()}>
                    <BsFileEarmarkWord style={{marginRight: '10px'}} />
                    <strong className="me-auto">NotWordle</strong>
                </Toast.Header>
                <Toast.Body>{props.alertText}</Toast.Body>
            </Toast>
        </div>
    );
};

export default Alert;