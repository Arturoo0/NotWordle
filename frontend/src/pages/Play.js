import React from 'react';
import WordGrid from '../components/WordGrid';

const Play = () => {
    const playContainerStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={playContainerStyle}>
            <WordGrid />
        </div>
    );
};

export default Play;