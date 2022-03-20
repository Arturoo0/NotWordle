import React, { useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { get } from '../utils/baseRequest.js';
import { Alert } from '.';

const WordGrid = (props) => {
    const [currentWordEntry, setCurrentWordEntry] = useState(null);
    const [enteredWords, setEnteredWords] = useState([]);
    const [isCurrentGame, setIsCurrentGame] = useState(true);
    const [isWinner, setIsWinner] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const { targetWord, gameOver, nextGame } = props.config;
    const gridStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '300px'
    };

    const rowStyle = {
        display: 'flex',
        justifyContent: 'center'
    };

    const setLetterStyling = (backColor) => {
        return {
            fontFamily: 'monospace',
            alignItems: 'center',
            display: 'flex',
            fontSize: '32px',
            fontWeight: '700',
            height: '58px',
            justifyContent: 'center',
            textTransform: 'uppercase',
            border: '2px solid hsla(0,0%,100%,.4)',
            color: '#cdcdcd',
            padding: '0 13px',
            margin: '5px 7px',
            backgroundColor: `${backColor}`
        }
    }

    const generatePostGameInfo = (_isWinner) => {
        return { isWinner: _isWinner };
    };

    const wordBlock = (letter, targetIndex) => {
        if (targetWord[targetIndex] === letter){
            return <div style={setLetterStyling('green')}>{letter}</div>;
        }else if (targetWord.includes(letter)){
            return <div style={setLetterStyling('gray')}>{letter}</div>;
        }
        return <div style={setLetterStyling('white')}>{letter}</div>;
    }

    const renderRow = (word) => {
        const rowLetters = word.split('').map((letter, index) => 
            wordBlock(letter, index)
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
        setCurrentWordEntry(event.target.value.toLowerCase());
    };

    const handleWordSubmit = async () => {
        setAlertMessage(null);
        const expectedWordLength = 5;
        if (currentWordEntry.length !== expectedWordLength){
            setAlertMessage(`Provided word is not ${expectedWordLength} characters`);
            return;
        }
        if (targetWord === currentWordEntry){
            setEnteredWords([...enteredWords, ...[currentWordEntry]]);
            gameOver(generatePostGameInfo(true));
            setIsCurrentGame(false);
            setIsWinner(true);
            return;
        }
        const response = await get(`/words/is-valid-word/${currentWordEntry}`, {});
        if (!response.data){
            setAlertMessage('Provided word is not in the word list');
        }else if (enteredWords.length < 6){
            setEnteredWords([...enteredWords, ...[currentWordEntry]]);
        }else{
            setAlertMessage(`Correct word was '${targetWord}'`)
            gameOver(generatePostGameInfo(false))
            setIsCurrentGame(false);
        }
    }

    const renderPostGame = () => {
        if (!isCurrentGame){
            return <Button onClick={() => {
                nextGame()
            }}>Next</Button>; 
        } 
    };


    const renderWordInput = () => {
        if (isCurrentGame){
            return (
                <>
                    <Form.Control style={{marginTop: '4px'}} maxLength={10} onChange={handleWordInput} />
                    <Form.Text muted>
                        Enter your word guess.
                    </Form.Text>
                    <Button onClick={handleWordSubmit} style={{marginTop: '4px'}}>Submit</Button>
                </>
            );
        }
    }

    return (
        <div style={gridStyle}>
            {(alertMessage) ?  <Alert alertText={alertMessage}/> : null}
            {renderRows()}
            {renderWordInput()}
            {renderPostGame()}
        </div>
    );
}

export default WordGrid;