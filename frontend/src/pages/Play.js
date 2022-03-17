import React, { useState, useEffect } from 'react';
import WordGrid from '../components/WordGrid';
import { get } from '../utils/baseRequest.js';

const Play = () => {
    const [targetWord, setTargetWord] = useState(null);
    useEffect(() => {
        const fetchTargetWord = async () => {
            const response = await get('/words/word', {});
            setTargetWord(response.data);
        }
        fetchTargetWord();
    }, []);

    const playContainerStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={playContainerStyle}>
            <WordGrid config={{
                wordLength: 5,
                targetWord: targetWord
            }}/>
        </div>
    );
};

export default Play;