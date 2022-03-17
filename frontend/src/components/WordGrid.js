import React, { useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { get } from '../utils/baseRequest.js';

const WordGrid = (props) => {
    const [currentWordEntry, setCurrentWordEntry] = useState(null);
    const [enteredWords, setEnteredWords] = useState([]);
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

    const renderRow = (word) => {
        const rowLetters = word.split('').map((letter) => 
            <div style={rowLetter}>{letter}</div>
        );
        return rowLetters;
    }

    const renderRows = () => {
        const rows = enteredWords.map((word) => 
            <div style={rowStyle}>{renderRow(word)}</div>
        );
        return rows;
    };

    const handleWordInput = (event) => {
        setCurrentWordEntry(event.target.value);
    };

    const handleWordSubmit = async () => {
        if (currentWordEntry.length > 5){
            alert('Provided word is greater than 5 characters');
            return;
        }
        const response = await get(`/words/is-valid-word/${currentWordEntry}`, {});
        if (!response.data){
            alert('Provided word is not in the word list')
        }else if (enteredWords.length < 6){
            setEnteredWords([...enteredWords, ...[currentWordEntry]]);
        }
    }

    return (
        <div style={gridStyle}>
            {renderRows()}
            <Form.Control maxLength={10} onChange={handleWordInput} />
            <Form.Text muted>
                Enter your word guess.
            </Form.Text>
            <Button onClick={handleWordSubmit} style={{marginTop: '4px'}}>Submit</Button>
        </div>
    );
}

export default WordGrid;