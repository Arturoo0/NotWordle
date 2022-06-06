import React, { useState, useEffect } from 'react';
import { WordGrid } from '../components';
import { get, post } from '../utils/baseRequest.js';

const Play = () => {
    const [targetWord, setTargetWord] = useState(null);
    const [reload, triggerReload] = useState(false);
    const playContainerStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    useEffect(() => {
        const fetchTargetWord = async () => {
            const response = await get('/words/word', {});
            setTargetWord(response.data);
        }
        fetchTargetWord();
    }, [reload]);

    const handleGameOver = async (postGameInfo) => {
        const sessionIdentifier = await localStorage.getItem('sessionId');
        await post('/user/save-game-result', 
            {...postGameInfo, ...{sessionTokenId: sessionIdentifier}},
            sessionIdentifier
            );
    };

    const handleNextGame = () => {
        triggerReload(!reload);
    };

    return (
        <div style={playContainerStyle}>
            <WordGrid key={targetWord} config={{
                wordLength: 5,
                targetWord: targetWord, 
                gameOver: handleGameOver,
                nextGame: handleNextGame
            }}/>
        </div>
    );
};

export default Play;