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

    const mapWordFrequencies = (word) => {
        let _map = {};
        [...word].forEach((letter) => {
            (letter in _map) ? _map[letter] += 1 : _map[letter] = 1;
        }); 
        return _map;
    };

    const generatePostGameInfo = (_isWinner) => {
        return { isWinner: _isWinner };
    };

    const wordBlock = (letter, color) => {
        return <div style={setLetterStyling(color)}>{letter}</div>;
    }

    const renderRow = (word) => {
        let associatedWordColors = [...Array(5)];
        const targetWordFrequencies = mapWordFrequencies(targetWord);
        [...word].forEach((letter, index) => {
            if (letter === targetWord[index]){
                associatedWordColors[index] = 'green';
                targetWordFrequencies[letter] -= 1;
            } 
        });
        [...word].forEach((letter, index) => {
            if (targetWord.includes(letter) && targetWordFrequencies[letter] > 0){
                associatedWordColors[index] = 'gray';
                targetWordFrequencies[letter] -= 1;
            }
        });
        const rowLetters = associatedWordColors.map((wordColor, index) => 
            wordBlock(word[index], wordColor)
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
            {(alertMessage) ?  <Alert 
                alertText={alertMessage}
                closeAlert= {() => {setAlertMessage(null)}}
            /> : null}
            {renderRows()}
            {renderWordInput()}
            {renderPostGame()}
        </div>
    );
}

export default WordGrid;