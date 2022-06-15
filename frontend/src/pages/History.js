import React, { useState, useEffect } from 'react';
import { HistoryFeed } from '../components';

const History = () => {
    const [history, setHistory] = useState(null);
    useEffect(() => {

    }, []);

    return (
        <div>
            <HistoryFeed />
        </div>
    )
};

export default History;