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
        height: '100vh'
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
            <p1>History</p1>
            <HistoryFeed gameHistory={history}/>
        </div>
    )
};

export default History;