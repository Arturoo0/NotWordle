import React, { useState, useEffect } from 'react';
import { HistoryFeed } from '../components';
import { get } from '../utils/baseRequest.js';

const History = () => {
    const [history, setHistory] = useState(null);
    useEffect(() => {
        const fetchHistory = () => {
            const response = get('/user/fetch-history', {});
            console.log(response);
        };
    }, []);

    return (
        <div>
            <HistoryFeed />
        </div>
    )
};

export default History;