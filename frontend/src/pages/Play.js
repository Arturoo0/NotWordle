import React, { useState, useEffect } from 'react';
import WordGrid from '../components/WordGrid';
import { get } from '../utils/baseRequest.js';

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

    const handleGameOver = (postGameInfo) => {
        console.log(postGameInfo);
        triggerReload(!reload);
    };

    return (
        <div style={playContainerStyle}>
            <WordGrid key={targetWord} config={{
                wordLength: 5,
                targetWord: targetWord, 
                gameOver: handleGameOver 
            }}/>
        </div>
    );
};

export default Play;