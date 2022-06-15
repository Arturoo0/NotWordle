import React, { useState, useEffect } from 'react';
import { HistoryFeed } from '../components';
import { get } from '../utils/baseRequest.js';

const History = () => {
    const [history, setHistory] = useState(null);
    useEffect(() => {
        const fetchHistory = async () => {
            const response = await get('/user/fetch-history', {});
            console.log(response);
        };
        fetchHistory();
    }, []);

    return (
        <div>
            <HistoryFeed />
        </div>
    )
};

export default History;