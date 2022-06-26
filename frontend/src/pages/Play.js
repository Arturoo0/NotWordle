import React, { useState, useEffect } from 'react';
import { WordGrid, PlayMenu } from '../components';
import { get, post } from '../utils/baseRequest.js';

const Play = () => {
    const [targetWord, setTargetWord] = useState(null);
    const [reload, triggerReload] = useState(false);
    const playContainerStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'column',
        backgroundColor: 'rgb(44, 48, 52)'
    };
    useEffect(() => {
        const fetchTargetWord = async () => {
            const response = await get('/words/word', {});
            setTargetWord(response.data);
        };
        fetchTargetWord();
    }, [reload]);

    const handleGameOver = async (postGameInfo) => {
        const sessionIdentifier = await localStorage.getItem('sessionId');
        await post('/user/save-game-result', 
            {...postGameInfo, ...{sessionTokenId: sessionIdentifier}}
        );
    };

    const handleNextGame = () => {
        triggerReload(!reload);
    };

    return (
        <div>
            <div style={playContainerStyle}>
                <WordGrid key={targetWord} config={{
                    wordLength: 5,
                    targetWord: targetWord, 
                    gameOver: handleGameOver,
                    nextGame: handleNextGame,
                    startTime: new Date()
                }}/>
                <PlayMenu />
            </div>
        </div>
    );
};

export default Play;