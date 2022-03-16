import React, { useState } from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';

const WordGrid = () => {
    const gridStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '300px'
    };

    const rowStyle = {
        display: 'flex',
        justifyContent: 'center'
    };

    const rowLetter = {
        alignItems: 'center',
        display: 'flex',
        fontSize: '32px',
        fontWeight: '700',
        height: '58px',
        justifyContent: 'center',
        textTransform: 'uppercase',
        border: '2px solid hsla(0,0%,100%,.4)',
        color: '#cdcdcd',
        padding: '0 13px'
    }

    const renderRows = () => {
        const rowLetters = [1, 2, 3, 4, 5].map((row) => 
            <div style={rowLetter}>-</div>
        );
        const rows = [1, 2, 3, 4, 5, 6].map((row) => 
            <div style={rowStyle}>{rowLetters}</div>
        );
        return rows;
    };

    return (
        <div style={gridStyle}>
            {renderRows()}
            <Form.Control />
            <Form.Text muted>
                Enter your word guess.
            </Form.Text>
        </div>
    );
}

export default WordGrid;