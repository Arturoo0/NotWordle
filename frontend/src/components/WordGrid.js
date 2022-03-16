import React, { useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { get } from '../utils/baseRequest.js';

const WordGrid = (props) => {
    const [currentWordEntry, setCurrentWordEntry] = useState(null);
    const [enteredWords, setEnteredWords] = useState(null);
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
        const { wordLength } = props.config; 
        const rowLetters = [...Array(wordLength)].map((row) => 
            <div style={rowLetter}>-</div>
        );
        const rows = [...Array(6)].map((row) => 
            <div style={rowStyle}>{rowLetters}</div>
        );
        return rows;
    };

    const handleWordInput = (event) => {
        setCurrentWordEntry(event.target.value);
    };

    const handleWordSubmit = async () => {
        const response = await get(`/words/is-valid-word/${currentWordEntry}`, {});
    }

    return (
        <div style={gridStyle}>
            {renderRows()}
            <Form.Control onChange={handleWordInput} />
            <Form.Text muted>
                Enter your word guess.
            </Form.Text>
            <Button onClick={handleWordSubmit} style={{marginTop: '4px'}}>Submit</Button>
        </div>
    );
}

export default WordGrid;