import React, { useState, useEffect } from 'react';
import { HistoryFeed } from '../components';
import { get } from '../utils/baseRequest.js';

const History = () => {
    const [history, setHistory] = useState(null);
    const historyFeedPositioning = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        flexDirection: 'column',
        height: '100vh',
        padding: '0 10% 0 10%',
        backgroundColor: '#2c3034'
    };
    useEffect(() => {
        const fetchHistory = async () => {
            const response = await get('/user/fetch-history', {});
            setHistory(response.data.history);
        };
        fetchHistory();
    }, []);

    return (
        <div style={historyFeedPositioning}>
            <HistoryFeed gameHistory={history}/>
        </div>
    )
};

export default History;